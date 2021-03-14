import Client from '../Client';
import Collection from '../utils/Collection';
import Base from './Base';
import ChannelMessages from './ChannelMessages';
import Message from './Message';

export default class Channel extends Base {
  /** The channel id where this channel is */
  id: string;
  /** The team id where this channel is */
  teamId: string;
  /** The messages sent in this channel. <messageID, message> */
  messages: ChannelMessages;
  /** All the collectors running on this channel. */
  collectors: {
    /** The message collectors running on this channel */
    messages: Collection<string, MessageCollector>;
    /** The reaction collectors running on this channel. */
    reactions: Collection<string, ReactionCollector>;
  };

  constructor(client: Client, payload: any) {
    super(client, payload.message.id);

    this.id = payload.id;
    this.teamId = payload.teamId;
    this.messages = new ChannelMessages(client);

    this.collectors = {
      messages: new Collection(client),
      reactions: new Collection(client),
    };
  }

  /** The team where this message was sent */
  get team() {
    return this.client.teams.get(this.teamId);
  }

  async needMessage(memberID: string, channelID: string, options?: MessageCollectorOptions) {
    const [message] = await this.collectMessages({
      key: memberID,
      channelID,
      createdAt: Date.now(),
      filter: options?.filter || (msg => memberID === msg.author.id),
      amount: options?.amount || 1,
      // 5 MINUTE DEFAULT DURATION
      duration: options?.duration || 1000 * 60 * 5,
    });

    return message;
  }

  async collectMessages(options: CollectMessagesOptions): Promise<Message[]> {
    return new Promise((resolve, reject) => {
      this.collectors.messages
        .get(options.key)
        ?.reject('A new collector began before the user responded to the previous one.');

      this.collectors.messages.set(options.key, {
        ...options,
        messages: [],
        resolve,
        reject,
      });
    });
  }

  async needReaction(memberID: string, messageID: string, options?: ReactionCollectorOptions) {
    const [reaction] = await this.collectReactions({
      key: memberID,
      messageID,
      createdAt: Date.now(),
      filter: options?.filter || (userID => memberID === userID),
      amount: options?.amount || 1,
      // 5 MINUTE DEFAULT DURATION
      duration: options?.duration || 1000 * 60 * 5,
    });

    return reaction;
  }

  async collectReactions(options: CollectReactionsOptions): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.collectors.reactions
        .get(options.key)
        ?.reject('A new collector began before the user responded to the previous one.');
      this.collectors.reactions.set(options.key, {
        ...options,
        reactions: [] as string[],
        resolve,
        reject,
      });
    });
  }

  processReactionCollectors(message: Message | MessageReactionUncachedPayload, emoji: ReactionPayload, userID: string) {
    // Ignore bot reactions
    if (userID === this.client.id) return;

    const emojiName = emoji.id || emoji.name;
    if (!emojiName) return;

    const collector = this.collectors.reactions.get(userID);
    if (!collector) return;

    // This user has no collectors pending or the message is in a different channel
    if (!collector || message.id !== collector.messageID) return;
    // This message is a response to a collector. Now running the filter function.
    if (!collector.filter(userID, emojiName, message)) return;

    // If the necessary amount has been collected
    if (collector.amount === 1 || collector.amount === collector.reactions.length + 1) {
      // Remove the collector
      this.collectors.reactions.delete(userID);
      // Resolve the collector
      return collector.resolve([...collector.reactions, emojiName]);
    }

    // More reactions still need to be collected
    collector.reactions.push(emojiName);
  }
}

export interface BaseCollectorOptions {
  /** The amount of messages to collect before resolving. Defaults to 1 */
  amount?: number;
  /** The amount of milliseconds this should collect for before expiring. Defaults to 5 minutes. */
  duration?: number;
}

export interface MessageCollectorOptions extends BaseCollectorOptions {
  /** Function that will filter messages to determine whether to collect this message. Defaults to making sure the message is sent by the same member. */
  filter?: (message: Message) => boolean;
  /** The amount of messages to collect before resolving. Defaults to 1 */
  amount?: number;
  /** The amount of milliseconds this should collect for before expiring. Defaults to 5 minutes. */
  duration?: number;
}

export interface ReactionCollectorOptions extends BaseCollectorOptions {
  /** Function that will filter messages to determine whether to collect this message. Defaults to making sure the message is sent by the same member. */
  filter?: (userID: string, reaction: string, message: Message | MessageReactionUncachedPayload) => boolean;
}

export interface BaseCollectorCreateOptions {
  /** The unique key that will be used to get responses for this. Ideally, meant to be for member id. */
  key: string;
  /** The amount of messages to collect before resolving. */
  amount: number;
  /** The timestamp when this collector was created */
  createdAt: number;
  /** The duration in milliseconds how long this collector should last. */
  duration: number;
}

export interface CollectMessagesOptions extends BaseCollectorCreateOptions {
  /** The channel ID where this is listening to */
  channelID: string;
  /** Function that will filter messages to determine whether to collect this message */
  filter: (message: Message) => boolean;
}

export interface CollectReactionsOptions extends BaseCollectorCreateOptions {
  /** The message ID where this is listening to */
  messageID: string;
  /** Function that will filter messages to determine whether to collect this message */
  filter: (userID: string, reaction: string, message: Message | MessageReactionUncachedPayload) => boolean;
}

export interface MessageCollector extends CollectMessagesOptions {
  resolve: (value: Message[] | PromiseLike<Message[]>) => void;
  reject: (reason?: any) => void;
  /** Where the messages are stored if the amount to collect is more than 1. */
  messages: Message[];
}

export interface ReactionCollector extends CollectReactionsOptions {
  resolve: (value: string[] | PromiseLike<string[]>) => void;
  reject: (reason?: any) => void;
  /** Where the messages are stored if the amount to collect is more than 1. */
  reactions: string[];
}

export interface MessageReactionUncachedPayload extends MessageReactionPayload {
  id: string;
  channelID: string;
  guildID?: string;
}

export interface BaseMessageReactionPayload {
  /** The id of the channel */
  channelId: string;
  /** The id of the message */
  messageId: string;
  /** The id of the guild */
  teamId?: string;
}

export interface MessageReactionPayload extends BaseMessageReactionPayload {
  /** The id of the user */
  userId: string;
  /** The emoji used to react */
  emoji: ReactionPayload;
}

export interface ReactionPayload {
  id: string;
  name: string;
}
