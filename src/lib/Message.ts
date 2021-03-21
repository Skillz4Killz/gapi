import { Client } from '../Client';
import { Embed } from '../utils/Embed';
import { Base } from './Base';
import { Channel } from './Channel';

export class Message extends Base {
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
  content: string;

  constructor(client: Client, payload: MessagePayload) {
    super(client, payload.message.id);

    if (!this.client.channels.has(payload.channelId))
      this.client.channels.set(payload.channelId, new Channel(client, payload));
    // if (!this.client.users.has(payload.createdBy)) this.client.users.set(payload.createdBy, new User(client, payload.message))

    this.guildedClientId = payload.guildedClientId;
    this.channelId = payload.channelId;
    this.channelCategoryId = payload.channelCategoryId;
    this.channelType = payload.channelType;
    this.teamId = payload.teamId;
    this.type = payload.message.type;
    this.authorId = payload.createdBy;
    this.timestamp = Date.parse(payload.createdAt);
    this.contentId = payload.contentId;
    this.content = this.generateContent(payload.message.content.document.nodes);
  }

  /** The author of this message. */
  get author() {
    return this.client.users.get(this.authorId)!;
  }

  /** The member of this message if it was sent in a team */
  get member() {
    return this.team?.members.get(this.authorId);
  }

  /** The team where this message was sent */
  get team() {
    return this.client.teams.get(this.teamId);
  }

  /** The channel where this message was sent */
  get channel() {
    return this.client.channels.get(this.channelId)!;
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

  /** Creates a content string based on the nodes on the message object. */
  generateContent(nodes: MessageNode[]) {
    let content = '';
    for (const node of nodes) {
      for (const n of node.nodes) {
        if (n.object === 'text') {
          for (const leaf of n.leaves) {
            if (leaf.object === 'leaf') content += leaf.text;
          }
        } else if (n.object === 'inline') {
          if (n.type === 'mention') {
            content += `<@${n.data?.mention.id}>`;
          }
        }
      }
    }

    return content;
  }

  /** Translate some text for this messages team */
  translate(key: string, options?: Record<string, any>, returnArray = false) {
    // @ts-ignore
    return this.client.translate(this.teamId, key, options, returnArray);
  }

  /** Send a message to the channel where this message was sent */
  send(content: string | Embed, embed?: Embed) {
    if (typeof content !== 'string') {
      embed = content;
      content = '';
    }

    return this.client.requestManager.sendMessage(this.channelId, {
      confirmed: false,
      messageId: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }),
      content: {
        object: 'value',
        document: {
          object: 'document',
          data: {},
          nodes: [
            {
              object: 'block',
              type: 'markdown-plain-text',
              data: {},
              nodes: [
                {
                  object: 'text',
                  leaves: [{ object: 'leaf', text: content, marks: [] }],
                },
              ],
            },
            {
              object: 'block',
              type: 'webhookMessage',
              data: {
                embeds: embed ? [embed.toJSON()] : [],
              },
              nodes: [],
            },
          ],
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
  type?: 'mention';
  leaves: MessageLeaf[];
  nodes?: MessageInnerNode[];
  data?: MessageInnerNodeData;
}

export interface MessageInnerNodeData {
  mention: {
    type: 'person';
    matcher: string;
    name: string;
    avatar: string;
    color: string;
    id: string;
    nickname: boolean;
  };
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
