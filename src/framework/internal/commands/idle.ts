import { Command, CommandArgument } from '../../Command';

export default class extends Command {
  name = 'idle';
  arguments = [
    {
      name: 'subcommand',
      type: 'subcommand',
      defaultValue: 'upgrade',
    },
  ] as CommandArgument[];

  async execute(_message: any, args: any) {
    console.log('inside idle command', args);
  }
}
