import { Message } from '../../../lib/Message';
import { Argument } from '../../Argument';
import { Command, CommandArgument } from '../../Command';

export default class extends Argument {
  name = 'number';

  async execute(parameters: string[], _message: Message, _command: Command, argument: CommandArgument) {
    const [number] = parameters;

    const valid = Number(number);
    if (!valid) return;

    if (valid < (argument.minimum || 0)) return;
    if (argument.maximum && valid > argument.maximum) return;
    if (!argument.allowDecimals) return Math.floor(valid);

    return valid;
  }
}
