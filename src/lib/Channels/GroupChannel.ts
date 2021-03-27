import { Client } from '../../Client';
import { BaseChannel } from './BaseChannel';

export class GroupChannel extends BaseChannel {
  /** The id of the group where this channel exists. */
  groupId: string;
  /** The category id for this channel */
  categoryId?: number;
  /** The order of the channels */
  priority: number;
  /** The permission overwrites in this channel */
//   permissions: new

  constructor(client: Client, payload: any) {
    super(client, payload);

    this.groupId = payload.groupId;
    this.priority = payload.priority;
    if (payload.channelCategoryId) this.categoryId = payload.channelCategoryId;

    this.update(payload)
  }

  update(payload: any) {
    this.priority = payload.priority;
    this.categoryId = payload.categoryId;
    super.update(payload);
  }

  /** The group where this channel exists */
  get group() {
    return this.team?.groups.get(this.groupId);
  }

  /** The category channel for this channel if one exists */
  get category() {
    if (!this.categoryId) return;

    return this.client.channels.get(this.categoryId.toString());
  }
}
