import { Message } from '../../../lib/Message';
import { Argument } from '../../Argument';
import { Command, CommandArgument } from '../../Command';

export default class extends Argument {
  name = 'subcommand';

  async execute(parameters: string[], _message: Message, command: Command, argument: CommandArgument) {
    const [subcommandName] = parameters;
    if (!subcommandName) return;

    const sub = command.subcommands?.find(
      sub => sub.name === subcommandName || Boolean(sub.aliases.includes(subcommandName)),
    );
    if (sub) return sub;

    return typeof argument.defaultValue === 'string' ? command.subcommands?.get(argument.defaultValue) : undefined;
  }
}
