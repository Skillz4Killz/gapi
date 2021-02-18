import Client from '../Client';
import Base from './Base';

export default class Message extends Base {
  /** The guilded client uuid */
  guildedClientID: string;
  /** The channel id where this message was sent */
  channelID: string;
  /** The category id of the channel this was sent in if available. */
  channelCategoryID: number;
  /** The type of the channel */
  channelType: string;
  /** The team id */
  teamID: string;
  /** The type of message this is. */
  type = 'default';
  /** The id of the user who sent this message. */
  authorID: string;
  /** The exact timestamp at when this message was sent. */
  timestamp: number;
  /** The content id for this message content. */
  contentID: string;
  /** The content/text for this message. */
  content = '';

  constructor(client: Client, payload: MessagePayload) {
    super(client, payload.message.id);

    this.guildedClientID = payload.guildedClientId;
    this.channelID = payload.channelId;
    this.channelCategoryID = payload.channelCategoryId;
    this.channelType = payload.channelType;
    this.teamID = payload.teamId;
    this.type = payload.message.type;
    this.authorID = payload.createdBy;
    this.timestamp = Date.parse(payload.createdAt);
    this.contentID = payload.contentId;
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
}

export interface MessageData {}

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
  data: MessageData;
  nodes: MessageInnerNode[];
}

export interface MessageDocument {
  object: string;
  data: MessageData;
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
