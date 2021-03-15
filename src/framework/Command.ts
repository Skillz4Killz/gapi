import { Message } from '../lib/Message';
import { Collection } from '../utils/Collection';
import { BotClient } from './Client';

export class Command {
  /** The client itself */
  client: BotClient;
  /** The name of the command. */
  name = '';
  /** The aliases for this command. */
  aliases: string[] = [];
  /** The description of the command. Can also be a function in case it needs to be translated or such. */
  description: string | ((message: Message, command: Command) => string) = 'No available description.';
  /** Whether or not this command should be allowed in dms only. By default this is false. */
  dmOnly = false;
  /** Whether or not this command should be allowed in teams only. By default this is true. */
  teamOnly = true;
  /** The permission level required to use this command. You can either pass in the level or a custom function which returns a boolean. */
  permissionLevels?: PermissionLevels[] | ((message: Message, command: Command) => boolean | Promise<boolean>);
  // TODO: fix this after better understanding of guilded permissions system
  // botTeamPermissions?: Permission[];
  // botChannelPermissions?: Permission[];
  // userTeamPermissions?: Permission[];
  // userChannelPermissions?: Permission[];
  /** The options for handling how often this command can be used. */
  cooldown = {
    /** The amount of seconds to wait. Set to 0 which is the default, if you do NOT want a cooldown. */
    seconds: 0,
    /** The amount of times a user is allowed to use this command before the cooldown kicks in. */
    allowedUses: 1,
  };
  /** The arguments for this command. */
  arguments: CommandArgument[] = [];
  /** The subcommands for this command. Subcommands are FULL commands. */
  subcommands: Collection<string, Command>;

  constructor(client: BotClient, name: string) {
    this.client = client;
    if (!this.name) this.name = name;
    this.subcommands = new Collection<string, Command>(this.client);

    this.client.commands.set(name, this);
  }

  // @ts-ignore
  async execute(message: Message, args: Record<string, any>) {
    // Placeholder for the function that will execute when this command is used.
  }
}

export enum PermissionLevels {
  MEMBER,
  MODERATOR,
  ADMIN,
  SERVER_OWNER,
  BOT_SUPPORT,
  BOT_DEVS,
  BOT_OWNER,
}

// TODO: Make this stricter
export type Permission = string;

export interface CommandArgument {
  /** The name of the argument. */
  name: string;
  /** The type of the argument you would like. Defaults to string. */
  type:
    | 'string'
    | 'number'
    | '...string'
    | 'boolean'
    | 'subcommand'
    | 'member'
    | 'role'
    | 'categorychannel'
    | 'newschanne'
    | 'textchannel'
    | 'voicechannel'
    | 'command'
    | 'duration'
    | 'snowflake'
    | '...snowflakes'
    | 'guild';
  /** The function that runs if this argument is required and is missing. */
  missing?: (message: Message) => unknown;
  /** Whether or not this argument is required. Defaults to true. */
  required?: boolean;
  /** If the type is string, this will force this argument to be lowercase. */
  lowercase?: boolean;
  /** If the type is string or subcommand you can provide literals. The argument MUST be exactly the same as the literals to be accepted. For example, you can list the subcommands here to make sure it matches. */
  literals?: string[];
  /** The default value for this argument/subcommand. */
  defaultValue?: string | boolean | number | ((message: Message, command: Command, argument: CommandArgument) => any);
}
