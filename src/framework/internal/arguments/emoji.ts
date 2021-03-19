import { EMOJI_REGEX } from '../../constants/emojiRegex';
import { Argument } from '../../Argument';

export default class extends Argument {
  name = 'emoji';

  async execute(parameters: string[]) {
    if (!parameters.length) return;

    const text = parameters.join(' ');

    const match = text?.match(EMOJI_REGEX);

    return match && match.length > 0 ? match?.join('') : undefined;
  }
}
