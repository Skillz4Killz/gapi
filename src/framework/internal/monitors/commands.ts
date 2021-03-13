import Message from '../../../lib/Message';
import Team from '../../../lib/Team';
import { bgYellow, black, bgBlack, red, green, white, bgGreen, bgMagenta, bgBlue } from '../../../utils/colorette';
import { Command } from '../../Command';
import Monitor from '../../Monitor';

export default class extends Monitor {
  ignoreDM = false;

  async execute(message: Message) {
    let prefix = this.parsePrefix(message.teamId);
    // TODO: Figure out how to determine if a mention
    // const botMention = `<@!${this.client.id}>`;
    const botMention = `@${this.client.user?.name}`;

    // If the message is not using the valid prefix or bot mention cancel the command
    if (message.content === botMention) {
      return message.send(this.parsePrefix(message.teamId));
    } else if (message.content.startsWith(botMention)) prefix = botMention;
    else if (!message.content.startsWith(prefix)) return;

    // Get the first word of the message without the prefix so it is just command name. `!ping testing` becomes `ping`
    const [commandName, ...parameters] = message.content.substring(prefix.length).split(' ');
    if (!commandName) return;

    // Check if this is a valid command
    const command = this.parseCommand(commandName);
    if (!command) return;

    const team = this.client.teams.get(message.teamId);
    this.logCommand(message, team?.name || 'DM', 'Trigger', commandName);

    return this.executeCommand(message, command, parameters, team);
  }

  /** Determine the prefix from the message */
  parsePrefix(guildId: string) {
    const prefix = guildId ? this.client.prefixes.get(guildId) : this.client.prefix;
    return prefix || this.client.prefix;
  }

  parseCommand(commandName: string) {
    const name = commandName.toLowerCase();
    const command = this.client.commands.get(name);
    if (command) return command;

    // Check aliases if the command wasn't found
    return this.client.commands.find(cmd => Boolean(cmd.aliases.includes(name)));
  }

  logCommand(
    message: Message,
    guildName: string,
    type: 'Failure' | 'Success' | 'Trigger' | 'Slowmode' | 'Missing',
    commandName: string,
  ) {
    const command = `[COMMAND: ${bgYellow(black(commandName))} - ${bgBlack(
      ['Failure', 'Slowmode', 'Missing'].includes(type) ? red(type) : type === 'Success' ? green(type) : white(type),
    )}]`;

    const author = this.client.users.get(message.authorId);
    const user = bgGreen(black(`${author?.name || 'Unknown'}(${message.authorId})`));
    const guild = bgMagenta(black(`${guildName}${message.teamId ? `(${message.teamId})` : ''}`));

    console.log(`${bgBlue(`[${this.client.getTime()}]`)} => ${command} by ${user} in ${guild}`);
  }

  async executeCommand(message: Message, command: Command, parameters: string[], team: Team | undefined) {
    try {
      // Parsed args and validated
      const args = (await this.parseArguments(message, command, parameters)) as
        | {
            [key: string]: unknown;
          }
        | false;
      // Some arg that was required was missing and handled already
      if (!args) {
        return this.logCommand(message, team?.name || 'DM', 'Missing', command.name);
      }

      // If no subcommand execute the command
      const [argument] = command.arguments || [];
      let subcommand = argument ? (args[argument.name] as Command) : undefined;

      if (!argument || argument.type !== 'subcommand' || !subcommand) {
        // Check subcommand permissions and options
        if (!(await this.commandAllowed(message, command, team))) return;

        await command.execute?.(message, args);
        return this.logCommand(message, team?.name || 'DM', 'Success', command.name);
      }

      if (!subcommand?.name) {
        subcommand = command?.subcommands?.get((subcommand as unknown) as string) as Command;
      }
      // A subcommand was asked for in this command
      if (![subcommand.name, ...(subcommand.aliases || [])].includes(parameters[0]!)) {
        this.executeCommand(message, subcommand, parameters, team);
      } else {
        const subParameters = parameters.slice(1);
        this.executeCommand(message, subcommand, subParameters, team);
      }
    } catch (error) {
      this.logCommand(message, team?.name || 'DM', 'Failure', command.name);
      console.error(error);
      this.client.handleCommandError(message, command, error);
    }
  }

  /** Runs the inhibitors to see if a command is allowed to run. */
  async commandAllowed(message: Message, command: Command, team?: Team) {
    const inhibitorResults = await Promise.all(
      this.client.inhibitors.map(async (inhibitor, name) => {
        const inhibited = await inhibitor.execute(message, command, team);
        return [name, inhibited];
      }),
    );

    let allowed = true;

    for (const result of inhibitorResults) {
      const [name, inhibited] = result;
      if (inhibited) {
        // Make sure the command will not run
        allowed = false;
        // Logs the command failure
        this.logCommand(message, team?.name || 'DM', 'Failure', command.name);
        const author = this.client.users.get(message.authorId);
        // Logs the exact inhibitors that failed
        console.log(`[Inhibitor] ${name} on ${command.name} for ${author?.name || 'Unknown'}`);
      }
    }

    return allowed;
  }

  /** Parses all the arguments for the command based on the message sent by the user. */
  async parseArguments(message: Message, command: Command, parameters: string[]) {
    const args: { [key: string]: unknown } = {};
    if (!command.arguments) return args;

    let missingRequiredArg = false;

    // Clone the parameters so we can modify it without editing original array
    const params = [...parameters];

    // Loop over each argument and validate
    for (const argument of command.arguments) {
      const resolver = this.client.arguments.get(argument.type || 'string');
      if (!resolver) continue;

      const result = await resolver.execute(params, message, command, argument);
      if (result !== undefined) {
        // Assign the valid argument
        args[argument.name] = result;
        // This will use up all args so immediately exist the loop.
        if (argument.type && ['...string', '...roles'].includes(argument.type)) {
          break;
        }
        // Remove a param for the next argument
        params.shift();
        continue;
      }

      // Invalid arg provided.
      if (Object.prototype.hasOwnProperty.call(argument, 'defaultValue')) {
        args[argument.name] = argument.defaultValue;
      } else if (command.subcommands?.has(parameters[0]!)) {
        continue;
      } else if (argument.required !== false) {
        // A REQUIRED ARG WAS MISSING TRY TO COLLECT IT
        const question = await message
          .send(
            message.translate(message.teamId, 'strings:MISSING_REQUIRED_ARG', {
              name: argument.name,
              type:
                argument.type === 'subcommand'
                  ? command.subcommands?.map(sub => sub.name).join(', ') || 'subcommand'
                  : argument.type,
            }),
          )
          .catch(console.log);
        if (question) {
          const response = await message.awaitMessage(message.authorId, message.channelId).catch(console.log);
          if (response) {
            const responseArg = await resolver.execute([response.content], message, command, argument);
            if (responseArg) {
              args[argument.name] = responseArg;
              params.shift();
              await message.channel.messages.delete([question.id, response.id]).catch(console.log);
              continue;
            }
          }
        }

        missingRequiredArg = true;
        argument.missing?.(message);
        break;
      }
    }

    // If an arg was missing then return false so we can error out as an object {} will always be truthy
    return missingRequiredArg ? false : args;
  }
}
