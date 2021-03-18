import { Argument } from '../../Argument';
import { SNOWFLAKE_REGEX } from '../../constants/snowflakeRegex';

export default class extends Argument {
  name = '...snowflakes';

  async execute(parameters: string[]) {
    const cleaned = parameters.map(p => {
      // If its just a normal id number
      if (!p.startsWith('<')) return p;
      // If its a nickname mention or role mention
      if (p.startsWith('<@!') || p.startsWith('<@&')) return p.substring(3, p.length - 1);
      // If it's a user mention or channel mention
      if (p.startsWith('<@') || p.startsWith('<#')) return p.substring(2, p.length - 1);

      // Unknown
      return p;
    });

    return cleaned.filter(text => SNOWFLAKE_REGEX.test(text));
  }
}
