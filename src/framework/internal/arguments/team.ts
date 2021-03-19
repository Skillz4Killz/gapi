import { Argument } from '../../Argument';

export default class extends Argument {
  name = 'team';

  async execute(parameters: string[]) {
    const [id] = parameters;
    if (!id) return;

    return this.client.teams.get(id);
  }
}
