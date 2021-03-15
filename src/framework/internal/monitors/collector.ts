import { Message } from '../../../lib/Message';
import { bgYellow, black, bgBlack, green, white, bgBlue } from '../../../utils/colorette';
import { Monitor } from '../../Monitor';

export default class extends Monitor {
  ignoreDM = false;

  async execute(message: Message) {
    const collector = message.channel.collectors.messages.get(message.authorId);
    // This user has no collectors pending or the message is in a different channel
    if (!collector || message.channelId !== collector.channelID) return;
    // This message is a response to a collector. Now running the filter function.
    if (!collector.filter(message)) return;

    console.log(
      `${bgBlue(`[${this.client.getTime()}]`)} [COLLECTOR: ${bgYellow(black(message.author.name))} - ${bgBlack(
        white('Trigger'),
      )}] by ${message.author.name}(${message.authorId}) in ${message.channelId}`,
    );

    // If the necessary amount has been collected
    if (collector.amount === 1 || collector.amount === collector.messages.length + 1) {
      console.log(
        `${bgBlue(`[${this.client.getTime()}]`)} [COLLECTOR: ${bgYellow(black(message.author.name))} - ${bgBlack(
          green('Success'),
        )}] by ${message.author.name}(${message.authorId}) in ${message.channelId}`,
      );

      // Remove the collector
      message.channel.collectors.messages.delete(message.authorId);
      // Resolve the collector
      return collector.resolve([...collector.messages, message]);
    }

    // More messages still need to be collected
    collector.messages.push(message);
  }
}
