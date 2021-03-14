import { baseStructures } from '../base';
import Message from './Message';

export default class ChannelMessages extends baseStructures.Collection<string, Message> {
  /** Delete multiple messages */
  async bulkDelete(messageIds: string[]) {
    // TODO: figure out how to bulk delete
    console.log(messageIds);
  }
}
