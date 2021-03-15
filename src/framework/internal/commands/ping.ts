import { Message } from '../../../lib/Message';
import { Command } from '../../Command';

export default class extends Command {
  name = 'ping';
  aliases = ['pong'];
  description = 'Ping! Check if the bot is responsive!';

  async execute(message: Message) {
    message.send(`Ping MS: ${Date.now() - message.timestamp}ms`);
  }
}
