import { Client } from '../../Client';
import { Base } from '../Base';

export class BaseChannel extends Base {
  /** The channel id where this channel is */
  id: string;
  /** The team id where this channel is */
  teamId: string;
  /** The name of the channel */
  name: string;
  /** The timestamp when this channel was created */
  createdAt: number;
  /** The timestamp when this channel was updated. */
  updatedAt?: number;

  constructor(client: Client, payload: any) {
    super(client, payload.message.id);

    this.id = payload.id.toString();
    this.teamId = payload.teamId;
    this.name = payload.name;
    this.createdAt = Date.parse(payload.createdAt);
    if (payload.updatedAt) this.updatedAt = Date.parse(payload.updatedAt);
  }

  update(payload: any) {
    this.name = payload.name;
    this.updatedAt = Date.parse(payload.updatedAt);
  }

  /** The team where this message was sent */
  get team() {
    return this.client.teams.get(this.teamId);
  }
}
