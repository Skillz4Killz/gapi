import { Message } from "../..";
import { Client } from "../Client";

export class GuildedEvents {
  /** The client for this event manager. */
  client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  /** Processes the event and processes it with the appropriate handler. */
  process(id: string, [event, payload]: [GuildedEventNames, Record<string, any>]) {
    if (!this[event]) this.client.emit('unknown', event, payload, id);
    else this[event](payload, id);
  }

  // TODO: WHAT ON EARTH IS THIS?
  USER_PINGED(payload: any, id: string) {
    this.client.emit('userPinged', payload, id);
  }

  /** Handler for whenever a message is created by any user. */
  ChatMessageCreated(payload: any, id: string) {
    this.client.emit('messageCreated', new Message(this.client, payload), id);
  }

  /** Handler for whenever a reaction was added to a message by any user. */
  ChatMessageReactionAdded(payload: any, id: string) {
    this.client.emit('reactionAdded', payload, id);
  }

  /** Handler for when a user types in a channel */
  ChatChannelTyping(payload: any, id: string) {
    this.client.emit('typing', payload, id);
  }

  /** Handler for when a user removes a reaction. */
  ChatMessageReactionDeleted(payload: any, id: string) {
    this.client.emit('reactionRemoved', payload, id);
  }

  /** Handler for when a user edits a message. */
  ChatMessageUpdated(payload: any, id: string) {
    this.client.emit('messageEdited', payload, id);
  }

  /** Handler for when a user deletes a message */
  ChatMessageDeleted(payload: any, id: string) {
    this.client.emit('messageDeleted', payload, id);
  }

  ChatChannelUpdated(payload: any, id: string) {
    this.client.emit('channelEdited', payload, id);
  }

  CHANNEL_SEEN(payload: any, id: string) {
    this.client.emit('channelSeen', payload, id);
  }

  TEAM_CHANNEL_CONTENT_CREATED(payload: any, id: string) {
    this.client.emit('teamChannelContentCreated', payload, id);
  }

  UserStreamsVisibilityUpdated(payload: any, id: string) {
    this.client.emit('userStreamsVisibilityEdited', payload, id);
  }

  StageUpdated(payload: any, id: string) {
    this.client.emit('stageEdited', payload, id);
  }

  TemporalChannelCreated(payload: any, id: string) {
    this.client.emit('threadCreated', payload, id);
  }

  TemporalChannelUsersAdded(payload: any, id: string) {
    this.client.emit('threadUserAdded', payload, id);
  }

  TEAM_CHANNEL_ARCHIVED(payload: any, id: string) {
    this.client.emit('teamChannelArchived', payload, id);
  }

  DMChatChannelCreated(payload: any, id: string) {
    this.client.emit('dmChatChannelCreated', payload, id);
  }
  ChatChannelBroadcastCall(payload: any, id: string) {
    this.client.emit('chatChannelBroadcastCall', payload, id);
  }
  ChatChannelBroadcastCallResponse(payload: any, id: string) {
    this.client.emit('chatChannelBroadcastCallResponse', payload, id);
  }

  ChatChannelHidden(payload: any, id: string) {
    this.client.emit('chatChannelHidden', payload, id);
  }
  ChatChannelNicknameChanged(payload: any, id: string) {
    this.client.emit('chatChannelNicknameChanged', payload, id);
  }

  ChatMessagesDeleted(payload: any, id: string) {
    this.client.emit('chatMessagesDeleted', payload, id);
  }

  ChatPinnedMessageCreated(payload: any, id: string) {
    this.client.emit('chatPinnedMessageCreated', payload, id);
  }
  ChatPinnedMessageDeleted(payload: any, id: string) {
    this.client.emit('chatPinnedMessageDeleted', payload, id);
  }

  TEAEM_SOCKET_RECONNECTED(payload: any, id: string) {
    this.client.emit('teamSockedReconnected', payload, id);
  }
  teamRolesUpdated(payload: any, id: string) {
    this.client.emit('teamRolesUpdated', payload, id);
  }
  TeamXpAdded(payload: any, id: string) {
    this.client.emit('teamXpAdded', payload, id);
  }
  TeamXpSet(payload: any, id: string) {
    this.client.emit('teamXpSet', payload, id);
  }
  teamReactionsUpdated(payload: any, id: string) {
    this.client.emit('teamReactionsUpdated', payload, id);
  }
  teamContentReactionsAdded(payload: any, id: string) {
    this.client.emit('teamContentReactionsAdded', payload, id);
  }
  teamContentReactionsRemoved(payload: any, id: string) {
    this.client.emit('teamContentReactionsRemoved', payload, id);
  }
  TeamContentDeleted(payload: any, id: string) {
    this.client.emit('teamContentDeleted', payload, id);
  }
  TeamMessagesDeleted(payload: any, id: string) {
    this.client.emit('teamMessagesDeleted', payload, id);
  }
  teamThreadCreated(payload: any, id: string) {
    this.client.emit('teamThreadCreated', payload, id);
  }
  teamThreadReplyCreated(payload: any, id: string) {
    this.client.emit('teamThreadReplyCreated', payload, id);
  }
  TeamEventModified(payload: any, id: string) {
    this.client.emit('teamEventModified', payload, id);
  }
  TeamEventCreated(payload: any, id: string) {
    this.client.emit('teamEventCreated', payload, id);
  }
  TeamEventRemoved(payload: any, id: string) {
    this.client.emit('teamEventRemoved', payload, id);
  }
  TeamMemberJoined(payload: any, id: string) {
    this.client.emit('teamMemberJoined', payload, id);
  }
  TeamMemberRemoved(payload: any, id: string) {
    this.client.emit('teamMemberRemoved', payload, id);
  }
  TeamMembersRemoved(payload: any, id: string) {
    this.client.emit('teamMembersRemoved', payload, id);
  }
  TeamMutedMembersUpdated(payload: any, id: string) {
    this.client.emit('teamMutedMembersUpdated', payload, id);
  }
  TeamDeafenedMembersUpdated(payload: any, id: string) {
    this.client.emit('teamDeafenedMembersUpdated', payload, id);
  }
  TeamMemberAliasUpdated(payload: any, id: string) {
    this.client.emit('teamMemberAliasUpdated', payload, id);
  }
  TeamSubscriptionInfoUpdated(payload: any, id: string) {
    this.client.emit('teamSubscriptionInfoUpdated', payload, id);
  }
  TeamStreamInfoUpdated(payload: any, id: string) {
    this.client.emit('teamStreamInfoUpdated', payload, id);
  }
  TeamContentOperationsApplied(payload: any, id: string) {
    this.client.emit('teamContentOperationsApplied', payload, id);
  }
  TeamContentReplaced(payload: any, id: string) {
    this.client.emit('teamContentReplaced', payload, id);
  }
  TeamContentReplyAdded(payload: any, id: string) {
    this.client.emit('teamContentReplyAdded', payload, id);
  }
  TeamContentReplyRemoved(payload: any, id: string) {
    this.client.emit('teamContentReplyRemoved', payload, id);
  }
  TeamAvailabilitiesUpdated(payload: any, id: string) {
    this.client.emit('teamAvailabilitiesUpdated', payload, id);
  }
  TeamChannelAvailabilitiesUpdated(payload: any, id: string) {
    this.client.emit('teamChannelAvailabilitiesUpdated', payload, id);
  }
  TeamChannelAvailabilitiesRemoved(payload: any, id: string) {
    this.client.emit('teamChannelAvailabilitiesRemoved', payload, id);
  }
  TeamMemberUpdated(payload: any, id: string) {
    this.client.emit('teamMemberUpdated', payload, id);
  }
  TeamMemberSocialLinkUpdated(payload: any, id: string) {
    this.client.emit('teamMemberSocialLinkUpdated', payload, id);
  }
  TeamGameAdded(payload: any, id: string) {
    this.client.emit('teamGameAdded', payload, id);
  }
  TeamApplicationCreated(payload: any, id: string) {
    this.client.emit('teamApplicationCreated', payload, id);
  }
  TeamApplicationRemoved(payload: any, id: string) {
    this.client.emit('teamApplicationRemoved', payload, id);
  }
  TeamApplicationUpdated(payload: any, id: string) {
    this.client.emit('teamApplicationUpdated', payload, id);
  }
  TeamUpdated(payload: any, id: string) {
    this.client.emit('teamUpdated', payload, id);
  }
  TeamChannelCreated(payload: any, id: string) {
    this.client.emit('teamChannelCreated', payload, id);
  }
  TeamChannelUpdated(payload: any, id: string) {
    this.client.emit('teamChannelUpdated', payload, id);
  }
  TeamChannelPrioritiesUpdated(payload: any, id: string) {
    this.client.emit('teamChannelPrioritiesUpdated', payload, id);
  }
  TeamChannelCategoryPrioritiesUpdated(payload: any, id: string) {
    this.client.emit('teamChannelCategoryPrioritiesUpdated', payload, id);
  }
  TeamChannelDeleted(payload: any, id: string) {
    this.client.emit('teamChannelDeleted', payload, id);
  }
  TeamChannelsDeleted(payload: any, id: string) {
    this.client.emit('teamChannelsDeleted', payload, id);
  }
  TeamChannelCategoryCreated(payload: any, id: string) {
    this.client.emit('teamChannelCategoryCreated', payload, id);
  }
  TeamChannelCategoryUpdated(payload: any, id: string) {
    this.client.emit('teamChannelCategoryUpdated', payload, id);
  }
  TeamChannelCategoryDeleted(payload: any, id: string) {
    this.client.emit('teamChannelCategoryDeleted', payload, id);
  }
  TeamChannelCategoriesDeleted(payload: any, id: string) {
    this.client.emit('teamChannelCategoriesDeleted', payload, id);
  }
  TeamChannelCategoryGroupMoved(payload: any, id: string) {
    this.client.emit('teamChannelCategoryGroupMoved', payload, id);
  }
  TeamWebhookCreated(payload: any, id: string) {
    this.client.emit('teamWebhookCreated', payload, id);
  }
  TeamWebhookUpdated(payload: any, id: string) {
    this.client.emit('teamWebhookUpdated', payload, id);
  }
  TeamBotCreated(payload: any, id: string) {
    this.client.emit('teamBotCreated', payload, id);
  }
  TeamBotUpdated(payload: any, id: string) {
    this.client.emit('teamBotUpdated', payload, id);
  }
  TeamBotFlowUpdated(payload: any, id: string) {
    this.client.emit('teamBotFlowUpdated', payload, id);
  }
  TeamGroupPrioritiesUpdated(payload: any, id: string) {
    this.client.emit('teamGroupPrioritiesUpdated', payload, id);
  }
  TeamGroupDeleted(payload: any, id: string) {
    this.client.emit('teamGroupDeleted', payload, id);
  }
  TeamGroupArchived(payload: any, id: string) {
    this.client.emit('teamGroupArchived', payload, id);
  }
  TeamGroupRestored(payload: any, id: string) {
    this.client.emit('teamGroupRestored', payload, id);
  }
  TeamGroupFollowed(payload: any, id: string) {
    this.client.emit('teamGroupFollowed', payload, id);
  }
  TeamStripeAccountOnboarded(payload: any, id: string) {
    this.client.emit('teamStripeAccountOnboarded', payload, id);
  }
  TeamServerSubscriptionPlanCreated(payload: any, id: string) {
    this.client.emit('teamServerSubscriptionPlanCreated', payload, id);
  }
  TeamServerSubscriptionPlanUpdated(payload: any, id: string) {
    this.client.emit('teamServerSubscriptionPlanUpdated', payload, id);
  }
  TeamServerSubscriptionPlanDeleted(payload: any, id: string) {
    this.client.emit('teamServerSubscriptionPlanDeleted', payload, id);
  }
  TeamServerSubscriptionUpdated(payload: any, id: string) {
    this.client.emit('teamServerSubscriptionUpdated', payload, id);
  }
  USER_SOCKET_CONNECTED(payload: any, id: string) {
    this.client.emit('uSER_SOCKET_CONNECTED', payload, id);
  }
  USER_SOCKET_CONNECT_ERROR(payload: any, id: string) {
    this.client.emit('uSER_SOCKET_CONNECT_ERROR', payload, id);
  }
  USER_SOCKET_RECONNECTED(payload: any, id: string) {
    this.client.emit('userSocketReconnected', payload, id);
  }
  USER_SOCKET_RECONNECTING(payload: any, id: string) {
    this.client.emit('userSocketReconnecting', payload, id);
  }
  USER_ALIAS_UPDATED(payload: any, id: string) {
    this.client.emit('userAliasUpdated', payload, id);
  }
  USER_TEAM_MEMBER_STREAM_UPDATED(payload: any, id: string) {
    this.client.emit('userTeamMemberStreamUpdated', payload, id);
  }
  USER_PRESENCE_MANUALLY_SET(payload: any, id: string) {
    this.client.emit('userPresenceManuallySet', payload, id);
  }
  USER_PRESENCE_RECEIVED(payload: any, id: string) {
    this.client.emit('userPresenceReceived', payload, id);
  }

  USER_UPDATED(payload: any, id: string) {
    this.client.emit('userUpdated', payload, id);
  }
  USER_TEAMS_UPDATED(payload: any, id: string) {
    this.client.emit('userTeamsUpdated', payload, id);
  }
  USER_SOCIAL_LINK_UPDATED(payload: any, id: string) {
    this.client.emit('userSocialLinkUpdated', payload, id);
  }
  USER_TEAM_SECTION_UNREAD_COUNT_INCREMENTED(payload: any, id: string) {
    this.client.emit('userTeamSectionUnreadCountIncremented', payload, id);
  }
  USER_SCANNED_MOBILE_DOWNLOAD_QR(payload: any, id: string) {
    this.client.emit('userScannedMobileDownloadQR', payload, id);
  }

  TEAM_CHANNEL_CONTENT_CREATED_SILENT(payload: any, id: string) {
    this.client.emit('teamChannelContentCreatedSilent', payload, id);
  }
  TEAM_CHANNEL_CONTENT_REPLY_CREATED(payload: any, id: string) {
    this.client.emit('teamChannelContentReplyCreated', payload, id);
  }
  TEAM_CHANNEL_CONTENT_REPLY_UPDATED(payload: any, id: string) {
    this.client.emit('teamChannelContentReplyUpdated', payload, id);
  }
  TEAM_CHANNEL_CONTENT_REPLY_DELETED(payload: any, id: string) {
    this.client.emit('teamChannelContentReplyDeleted', payload, id);
  }
  TEAM_CHANNEL_CONTENT_UPDATED(payload: any, id: string) {
    this.client.emit('teamChannelContentUpdated', payload, id);
  }
  TEAM_CHANNEL_CONTENT_DELETED(payload: any, id: string) {
    this.client.emit('teamChannelContentDeleted', payload, id);
  }

  TEAM_CHANNEL_RESTORED(payload: any, id: string) {
    this.client.emit('teamChannelRestored', payload, id);
  }
  TeamChannelVoiceParticipantAdded(payload: any, id: string) {
    this.client.emit('teamChannelVoiceParticipantAdded', payload, id);
  }
  TeamChannelVoiceParticipantRemoved(payload: any, id: string) {
    this.client.emit('teamChannelVoiceParticipantRemoved', payload, id);
  }
  TeamChannelVoiceUserClientConnected(payload: any, id: string) {
    this.client.emit('teamChannelVoiceUserClientConnected', payload, id);
  }
  TeamChannelStreamUserClientConnected(payload: any, id: string) {
    this.client.emit('teamChannelStreamUserClientConnected', payload, id);
  }
  TeamChannelStreamAdded(payload: any, id: string) {
    this.client.emit('teamChannelStreamAdded', payload, id);
  }
  TeamChannelStreamRemoved(payload: any, id: string) {
    this.client.emit('teamChannelStreamRemoved', payload, id);
  }
  TeamChannelStreamActive(payload: any, id: string) {
    this.client.emit('teamChannelStreamActive', payload, id);
  }
  TeamChannelStreamEnded(payload: any, id: string) {
    this.client.emit('teamChannelStreamEnded', payload, id);
  }
  TeamChannelVoiceUserMoved(payload: any, id: string) {
    this.client.emit('teamChannelVoiceUserMoved', payload, id);
  }

  CHANNEL_CONTENT_SEEN(payload: any, id: string) {
    this.client.emit('channelContentSeen', payload, id);
  }
  CHANNEL_BADGED(payload: any, id: string) {
    this.client.emit('channelBadged', payload, id);
  }
  CHANNEL_UNBADGED(payload: any, id: string) {
    this.client.emit('channelUnbadged', payload, id);
  }
  TEAM_GROUP_CREATED(payload: any, id: string) {
    this.client.emit('teamGroupCreated', payload, id);
  }
  TEAM_GROUP_UPDATED(payload: any, id: string) {
    this.client.emit('teamGroupUpdated', payload, id);
  }
  TEAM_GROUP_DELETED_FOR_USER(payload: any, id: string) {
    this.client.emit('teamGroupDeletedForUser', payload, id);
  }
  TEAM_USER_GROUP_PRIORITIES_UPDATED(payload: any, id: string) {
    this.client.emit('teamUserGroupPrioritiesUpdated', payload, id);
  }
  TEAM_GROUP_MARKED_AS_READ(payload: any, id: string) {
    this.client.emit('teamGroupMarkedAsRead', payload, id);
  }
  USER_MEDIA_UPLOAD_PROGRESS(payload: any, id: string) {
    this.client.emit('userMediaUploadProgress', payload, id);
  }
  VoiceChannelRegionPingReport(payload: any, id: string) {
    this.client.emit('voiceChannelRegionPingReport', payload, id);
  }
}

export type GuildedEventNames =
  | 'DMChatChannelCreated'
  | 'ChatChannelBroadcastCall'
  | 'ChatChannelBroadcastCallResponse'
  | 'ChatChannelUpdated'
  | 'ChatChannelTyping'
  | 'ChatChannelHidden'
  | 'ChatChannelNicknameChanged'
  | 'ChatMessageCreated'
  | 'ChatMessageUpdated'
  | 'ChatMessageDeleted'
  | 'ChatMessagesDeleted'
  | 'ChatMessageReactionAdded'
  | 'ChatMessageReactionDeleted'
  | 'ChatPinnedMessageCreated'
  | 'ChatPinnedMessageDeleted'
  | 'TemporalChannelCreated'
  | 'TemporalChannelUsersAdded'
  | 'TEAEM_SOCKET_RECONNECTED'
  | 'teamRolesUpdated'
  | 'TeamXpAdded'
  | 'TeamXpSet'
  | 'teamReactionsUpdated'
  | 'teamContentReactionsAdded'
  | 'teamContentReactionsRemoved'
  | 'TeamContentDeleted'
  | 'TeamMessagesDeleted'
  | 'teamThreadCreated'
  | 'teamThreadReplyCreated'
  | 'TeamEventModified'
  | 'TeamEventCreated'
  | 'TeamEventRemoved'
  | 'TeamMemberJoined'
  | 'TeamMemberRemoved'
  | 'TeamMembersRemoved'
  | 'TeamMutedMembersUpdated'
  | 'TeamDeafenedMembersUpdated'
  | 'TeamMemberAliasUpdated'
  | 'TeamSubscriptionInfoUpdated'
  | 'TeamStreamInfoUpdated'
  | 'TeamContentOperationsApplied'
  | 'TeamContentReplaced'
  | 'TeamContentReplyAdded'
  | 'TeamContentReplyRemoved'
  | 'TeamAvailabilitiesUpdated'
  | 'TeamChannelAvailabilitiesUpdated'
  | 'TeamChannelAvailabilitiesRemoved'
  | 'TeamMemberUpdated'
  | 'TeamMemberSocialLinkUpdated'
  | 'TeamGameAdded'
  | 'TeamApplicationCreated'
  | 'TeamApplicationRemoved'
  | 'TeamApplicationUpdated'
  | 'TeamUpdated'
  | 'TeamChannelCreated'
  | 'TeamChannelUpdated'
  | 'TeamChannelPrioritiesUpdated'
  | 'TeamChannelCategoryPrioritiesUpdated'
  | 'TeamChannelDeleted'
  | 'TeamChannelsDeleted'
  | 'TeamChannelCategoryCreated'
  | 'TeamChannelCategoryUpdated'
  | 'TeamChannelCategoryDeleted'
  | 'TeamChannelCategoriesDeleted'
  | 'TeamChannelCategoryGroupMoved'
  | 'TeamWebhookCreated'
  | 'TeamWebhookUpdated'
  | 'TeamBotCreated'
  | 'TeamBotUpdated'
  | 'TeamBotFlowUpdated'
  | 'TeamGroupPrioritiesUpdated'
  | 'TeamGroupDeleted'
  | 'TeamGroupArchived'
  | 'TeamGroupRestored'
  | 'TeamGroupFollowed'
  | 'TeamStripeAccountOnboarded'
  | 'TeamServerSubscriptionPlanCreated'
  | 'TeamServerSubscriptionPlanUpdated'
  | 'TeamServerSubscriptionPlanDeleted'
  | 'TeamServerSubscriptionUpdated'
  | 'USER_SOCKET_CONNECTED'
  | 'USER_SOCKET_CONNECT_ERROR'
  | 'USER_SOCKET_RECONNECTED'
  | 'USER_SOCKET_RECONNECTING'
  | 'USER_ALIAS_UPDATED'
  | 'USER_TEAM_MEMBER_STREAM_UPDATED'
  | 'USER_PRESENCE_MANUALLY_SET'
  | 'USER_PRESENCE_RECEIVED'
  | 'USER_PINGED'
  | 'USER_UPDATED'
  | 'USER_TEAMS_UPDATED'
  | 'USER_SOCIAL_LINK_UPDATED'
  | 'USER_TEAM_SECTION_UNREAD_COUNT_INCREMENTED'
  | 'USER_SCANNED_MOBILE_DOWNLOAD_QR'
  | 'UserStreamsVisibilityUpdated'
  | 'TEAM_CHANNEL_CONTENT_CREATED'
  | 'TEAM_CHANNEL_CONTENT_CREATED_SILENT'
  | 'TEAM_CHANNEL_CONTENT_REPLY_CREATED'
  | 'TEAM_CHANNEL_CONTENT_REPLY_UPDATED'
  | 'TEAM_CHANNEL_CONTENT_REPLY_DELETED'
  | 'TEAM_CHANNEL_CONTENT_UPDATED'
  | 'TEAM_CHANNEL_CONTENT_DELETED'
  | 'TEAM_CHANNEL_ARCHIVED'
  | 'TEAM_CHANNEL_RESTORED'
  | 'TeamChannelVoiceParticipantAdded'
  | 'TeamChannelVoiceParticipantRemoved'
  | 'TeamChannelVoiceUserClientConnected'
  | 'TeamChannelStreamUserClientConnected'
  | 'TeamChannelStreamAdded'
  | 'TeamChannelStreamRemoved'
  | 'TeamChannelStreamActive'
  | 'TeamChannelStreamEnded'
  | 'TeamChannelVoiceUserMoved'
  | 'CHANNEL_SEEN'
  | 'CHANNEL_CONTENT_SEEN'
  | 'CHANNEL_BADGED'
  | 'CHANNEL_UNBADGED'
  | 'TEAM_GROUP_CREATED'
  | 'TEAM_GROUP_UPDATED'
  | 'TEAM_GROUP_DELETED_FOR_USER'
  | 'TEAM_USER_GROUP_PRIORITIES_UPDATED'
  | 'TEAM_GROUP_MARKED_AS_READ'
  | 'USER_MEDIA_UPLOAD_PROGRESS'
  | 'VoiceChannelRegionPingReport'
  | 'StageUpdated';
