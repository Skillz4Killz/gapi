import { Message } from '../../../lib/Message';
import { Argument } from '../../Argument';
import { Command, CommandArgument } from '../../Command';

export default class extends Argument {
  name = '...string';

  async execute(parameters: string[], _message: Message, _command: Command, argument: CommandArgument) {
    if (!parameters.length) return;

    return argument.lowercase ? parameters.join(' ').toLowerCase() : parameters.join(' ');
  }
}
