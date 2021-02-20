import { baseStructures } from '../base';
import Client from '../Client';

export default class Message extends baseStructures.Base {
  /** The guilded client uuid */
  guildedClientId: string;
  /** The channel id where this message was sent */
  channelId: string;
  /** The category id of the channel this was sent in if available. */
  channelCategoryId: number;
  /** The type of the channel */
  channelType: string;
  /** The team id */
  teamId: string;
  /** The type of message this is. */
  type = 'default';
  /** The id of the user who sent this message. */
  authorId: string;
  /** The exact timestamp at when this message was sent. */
  timestamp: number;
  /** The content id for this message content. */
  contentId: string;
  /** The content/text for this message. */
  content = '';

  constructor(client: Client, payload: MessagePayload) {
    super(client, payload.message.id);

    this.guildedClientId = payload.guildedClientId;
    this.channelId = payload.channelId;
    this.channelCategoryId = payload.channelCategoryId;
    this.channelType = payload.channelType;
    this.teamId = payload.teamId;
    this.type = payload.message.type;
    this.authorId = payload.createdBy;
    this.timestamp = Date.parse(payload.createdAt);
    this.contentId = payload.contentId;
    this.content = payload.message.content.document.nodes[0]?.nodes[0]?.leaves[0]?.text || '';
  }

  /** The Date object for when this message was created. */
  get createdAt() {
    return new Date(this.timestamp);
  }

  /** The Date in ISO string for when this message was created */
  get createdAtISO() {
    return this.createdAt.toISOString();
  }

  /** Remove a reaction on this message using the emoji id. */
  removeReaction(id: string) {
    return this.client.requestManager.removeReaction(this.channelId, this.id, id);
  }

  /** Add a reaction on this message using the emoji id */
  addReaction(id: string) {
    return this.client.requestManager.addReaction(this.channelId, this.id, id);
  }

  /** Add a reaction on this message using the emoji id. */
  react(id: string) {
    return this.addReaction(id);
  }

  /** Delete the message */
  delete() {
    return this.client.requestManager.deleteMessage(this.channelId, this.id);
  }

  /** Send a message to the channel where this message was sent */
  send(content: string) {
    return this.client.requestManager.sendMessage(this.channelId, {
        confirmed: false,
        messageId: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        }),
        content: { object: 'value', document: {
          object: 'document',
          data: {},
          nodes: [
            {
              object: 'block', type: 'paragraph', data: {}, nodes: [{
                object: 'text',
                leaves: [
                  { object: 'leaf', text: content, marks: [] }
                ]
              }]
            }
          ]
        },
      },
    });
  }
}

export interface MessageNodeData {}

export interface MessageLeaf {
  object: string;
  text: string;
  marks: any[];
}

export interface MessageInnerNode {
  object: string;
  leaves: MessageLeaf[];
}

export interface MessageNode {
  object: string;
  type: string;
  data: MessageNodeData;
  nodes: MessageInnerNode[];
}

export interface MessageDocument {
  object: string;
  data: MessageNodeData;
  nodes: MessageNode[];
}

export interface MessageContent {
  object: string;
  document: MessageDocument;
}

export interface MessageData {
  id: string;
  createdBy: string;
  content: MessageContent;
  type: string;
  createdAt: Date;
}

export interface MessagePayload {
  type: string;
  guildedClientId: string;
  channelId: string;
  channelCategoryId: number;
  channelType: string;
  teamId: string;
  contentType: string;
  message: MessageData;
  createdAt: string;
  contentId: string;
  createdBy: string;
}
