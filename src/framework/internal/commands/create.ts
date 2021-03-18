import { Command, CommandArgument } from '../../Command';

export default class extends Command {
  name = 'create';
  arguments = [
    {
      name: 'subcommand',
      type: 'subcommand',
      defaultValue: 'upgrade',
    },
  ] as CommandArgument[];
  subcommand = 'idle';

  async execute() {
    console.log('inside idle create command');
  }
}
