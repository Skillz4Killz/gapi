import Client from '../Client';
import Message from '../lib/Message';

export default class GuildedEvents {
  client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  process(id: string, [event, payload]: [string, Record<string, any>]) {
    switch (event) {
      case 'USER_PINGED':
        this.userPinged(payload);
        break;
      case 'ChatMessageCreated':
        this.messageCreate(payload);
        break;
      default:
        this.client.emit('unknown', event, payload, id);
    }
  }

  userPinged(payload: any) {
    this.client.emit('userPinged', payload);
  }

  messageCreate(payload: any) {
    this.client.emit('messageCreate', new Message(this.client, payload));
  }
}
