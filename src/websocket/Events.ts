import Client from '../Client';
import Message from '../lib/Message';

export default class GuildedEvents {
  /** The client for this event manager. */
  client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /** Processes the event and processes it with the appropriate handler. */
  process(id: string, [event, payload]: [GuildedEventNames, Record<string, any>]) {
    // @ts-ignore
    if (!this[event]) this.client.emit('unknown', event, payload, id);
    // @ts-ignore
    else this[event](payload, id);
  }

  // TODO: WHAT ON EARTH IS THIS?
  USER_PINGED(payload: any) {
    this.client.emit('userPinged', payload);
  }

  /** Handler for whenever a message is created by any user. */
  ChatMessageCreated(payload: any) {
    this.client.emit('messageCreate', new Message(this.client, payload));
  }
}

export type GuildedEventNames = 
  "USER_PINGED" | 
  "ChatMessageCreated" |
  "DMChatChannelCreated" |
  "ChatChannelBroadcastCall" |
  "ChatChannelBroadcastCallResponse" |
  "ChatChannelUpdated" |
  "ChatChannelTyping" |
  "ChatChannelHidden" |
  "ChatChannelNicknameChanged" |
  "ChatMessageCreated" |
  "ChatMessageUpdated" |
  "ChatMessageDeleted" |
  "ChatMessagesDeleted" |
  "ChatMessageReactionAdded" |
  "ChatMessageReactionDeleted" |
  "ChatPinnedMessageCreated" |
  "ChatPinnedMessageDeleted" |
  "TemporalChannelCreated" |
  "TemporalChannelUsersAdded" |
  "TEAEM_SOCKET_RECONNECTED" |
  "teamRolesUpdated" |
  "TeamXpAdded" |
  "TeamXpSet" |
  "teamReactionsUpdated" |
  "teamContentReactionsAdded" |
  "teamContentReactionsRemoved" |
  "TeamContentDeleted" |
  "TeamMessagesDeleted" |
  "teamThreadCreated" |
  "teamThreadReplyCreated" |
  "TeamEventModified" |
  "TeamEventCreated" |
  "TeamEventRemoved" |
  "TeamMemberJoined" |
  "TeamMemberRemoved" |
  "TeamMembersRemoved" |
  "TeamMutedMembersUpdated" |
  "TeamDeafenedMembersUpdated" |
  "TeamMemberAliasUpdated" |
  "TeamSubscriptionInfoUpdated" |
  "TeamStreamInfoUpdated" |
  "TeamContentOperationsApplied" |
  "TeamContentReplaced" |
  "TeamContentReplyAdded" |
  "TeamContentReplyRemoved" |
  "TeamAvailabilitiesUpdated" |
  "TeamChannelAvailabilitiesUpdated" |
  "TeamChannelAvailabilitiesRemoved" |
  "TeamMemberUpdated" |
  "TeamMemberSocialLinkUpdated" |
  "TeamGameAdded" |
  "TeamApplicationCreated" |
  "TeamApplicationRemoved" |
  "TeamApplicationUpdated" |
  "TeamUpdated" |
  "TeamChannelCreated" |
  "TeamChannelUpdated" |
  "TeamChannelPrioritiesUpdated" |
  "TeamChannelCategoryPrioritiesUpdated" |
  "TeamChannelDeleted" |
  "TeamChannelsDeleted" |
  "TeamChannelCategoryCreated" |
  "TeamChannelCategoryUpdated" |
  "TeamChannelCategoryDeleted" |
  "TeamChannelCategoriesDeleted" |
  "TeamChannelCategoryGroupMoved" |
  "TeamWebhookCreated" |
  "TeamWebhookUpdated" |
  "TeamBotCreated" |
  "TeamBotUpdated" |
  "TeamBotFlowUpdated" |
  "TeamGroupPrioritiesUpdated" |
  "TeamGroupDeleted" |
  "TeamGroupArchived" |
  "TeamGroupRestored" |
  "TeamGroupFollowed" |
  "TeamStripeAccountOnboarded" |
  "TeamServerSubscriptionPlanCreated" |
  "TeamServerSubscriptionPlanUpdated" |
  "TeamServerSubscriptionPlanDeleted" |
  "TeamServerSubscriptionUpdated" |
  "USER_SOCKET_CONNECTED" |
  "USER_SOCKET_CONNECT_ERROR" |
  "USER_SOCKET_RECONNECTED" |
  "USER_SOCKET_RECONNECTING" |
  "USER_ALIAS_UPDATED" |
  "USER_TEAM_MEMBER_STREAM_UPDATED" |
  "USER_PRESENCE_MANUALLY_SET" |
  "USER_PRESENCE_RECEIVED" |
  "USER_PINGED" |
  "USER_UPDATED" |
  "USER_TEAMS_UPDATED" |
  "USER_SOCIAL_LINK_UPDATED" |
  "USER_TEAM_SECTION_UNREAD_COUNT_INCREMENTED" |
  "USER_SCANNED_MOBILE_DOWNLOAD_QR" |
  "UserStreamsVisibilityUpdated" |
  "TEAM_CHANNEL_CONTENT_CREATED" |
  "TEAM_CHANNEL_CONTENT_CREATED_SILENT" |
  "TEAM_CHANNEL_CONTENT_REPLY_CREATED" |
  "TEAM_CHANNEL_CONTENT_REPLY_UPDATED" |
  "TEAM_CHANNEL_CONTENT_REPLY_DELETED" |
  "TEAM_CHANNEL_CONTENT_UPDATED" |
  "TEAM_CHANNEL_CONTENT_DELETED" |
  "TEAM_CHANNEL_ARCHIVED" |
  "TEAM_CHANNEL_RESTORED" |
  "TeamChannelVoiceParticipantAdded" |
  "TeamChannelVoiceParticipantRemoved" |
  "TeamChannelVoiceUserClientConnected" |
  "TeamChannelStreamUserClientConnected" |
  "TeamChannelStreamAdded" |
  "TeamChannelStreamRemoved" |
  "TeamChannelStreamActive" |
  "TeamChannelStreamEnded" |
  "TeamChannelVoiceUserMoved" |
  "CHANNEL_SEEN" |
  "CHANNEL_CONTENT_SEEN" |
  "CHANNEL_BADGED" |
  "CHANNEL_UNBADGED" |
  "TEAM_GROUP_CREATED" |
  "TEAM_GROUP_UPDATED" |
  "TEAM_GROUP_DELETED_FOR_USER" |
  "TEAM_USER_GROUP_PRIORITIES_UPDATED" |
  "TEAM_GROUP_MARKED_AS_READ" |
  "USER_MEDIA_UPLOAD_PROGRESS" |
  "VoiceChannelRegionPingRepor";