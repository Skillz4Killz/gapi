import { EMOJI_REGEX } from '../../constants/emojiRegex';
import { Argument } from '../../Argument';

export default class extends Argument {
  name = '...emojis';

  async execute(parameters: string[]) {
    if (!parameters.length) return;

    const text = parameters.join(' ');

    const match = text?.match(EMOJI_REGEX);

    if (match && match.length > 0) {
      return match?.join('');
    }
  }
}
