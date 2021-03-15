import { Collection } from '../utils/Collection';
import { Message } from './Message';

export class ChannelMessages extends Collection<string, Message> {
  /** Delete multiple messages */
  async bulkDelete(messageIds: string[]) {
    // TODO: figure out how to bulk delete
    console.log(messageIds);
  }
}
