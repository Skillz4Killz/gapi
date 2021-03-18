import { Message } from '../../../lib/Message';
import { Argument } from '../../Argument';
import { Command, CommandArgument } from '../../Command';

export default class extends Argument {
  name = 'string';

  async execute(parameters: string[], _message: Message, _command: Command, argument: CommandArgument) {
    const [text] = parameters;

    // If the argument required literals and some string was provided by user
    const valid =
      argument.literals?.length && text ? (argument.literals.includes(text.toLowerCase()) ? text : undefined) : text;

    if (!valid) return;

    return argument.lowercase ? valid.toLowerCase() : valid;
  }
}
