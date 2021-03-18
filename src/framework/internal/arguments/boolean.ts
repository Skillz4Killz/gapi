import { Argument } from '../../Argument';

export default class extends Argument {
  name = 'boolean';

  async execute(parameters: string[]) {
    const [boolean] = parameters;
    if (!boolean || !['true', 'false', 'on', 'off', 'enable', 'disable'].includes(boolean)) return;

    return ['true', 'on', 'enable'].includes(boolean);
  }
}
