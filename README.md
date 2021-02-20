# gapi / gupi

A TypeScript NodeJS API Wrapper for Guilded.gg API.

> Currently unstable and in active dev. Use with caution.

> The name is gapi but silly google took that name so on npm we use gupi

## This lib is not being built to be used! It is an experiment for me to learn and grow as a developer.

# Design Goals

- Best Scalability!
- Best developer experience!
- Extremely flexible/dynamic!
- Keep close to API as possible

## Features 

This list is completed features that are currently finished. The full feature list will only be ready when the TODO list is completed.

- [x] Initial Connection
  - [x] Handle closes/Reconnection
- [x] Custom structures support
  - [x] Add custom props
  - [x] Remove undesired props to save RAM
- [x] Basic Cache control
- [x] Clean and powerful events system
  - [x] Event listeners that are ran when an event occurs.
  - [x] Useful events available to help debug!
  
# Usage

## Beginner/Basic

```ts
import { Client } from 'gupi';

new Client({ email: 'emailhere', password: 'passwordhere' })
  .on('ready', () => console.log('Successfully connected to gateway'))
  .on('messageCreate', message => {
    if (message.content === '!ping') {
      // TODO: pending
    }
  })
  .on('unknown', console.log)
  .connect();
```

## Advanced

```ts
import { Client, baseStructures, structures } from 'gupi';

// Override any internal structures without having to fork and maintain headaches.
baseStructures.Base = class {
  // Adding custom props
  newProp: 'success';
  // On the opposite side, use this to remove any props you don't want to save RAM/cache!

  // Adding custom getters
  get newGetter() {
    return true;
  }

  // Add custom methods
  newMethod() {
    return true;
  }
};

// Most commonly used structures
structures.Message = class extends baseStructures.Base {
  // Same as above. Everything is customizable
};

// Start it up!
const client = new Client({ email: 'emailhere', password: 'passwordhere' })
  .on('ready', () => console.log('Successfully connected to gateway'))
  .on('messageCreate', message => {
    if (message.content === '!ping') {
      // TODO: pending
    }
  });

// Cache Control!
// Set to 0 to disable caching. Apply to any desired Collection.
client.users.maxSize = 1000;

client.connect();
```

# To Do List

- Framework
  - Clean and powerful commands system
    - Powerful argument handling including validating, parsing and modifications.
    - Easily create custom arguments for your specific needs.
    - Command aliases.
    - Cooldowns and allowed uses before cooldown triggers.
    - Author and bot permission checks in server AND in channel!
  - Clean and powerful inhibitors system
    - Stops a command from running if a requirement fails.
    - Easily add custom inhibitors!
  - Clean and powerful monitors system.
    - Runs a function on every message sent. Useful for stuff like auto-moderation or tags.
    - Easily ignore bots, users, edits, dms.
    - Powerful permission checks.
  - Clean and powerful tasks system.
    - Runs a function at a certain interval. Useful for things like unmute and updating bot lists etc.
    - Can be used for cache sweeping to keep your cache optimized for exactly what you want.
    - Botlists code already made for most botlists. Just add your api tokens for each site and magic!
  - Clean and powerful languages system.
    - Built in multi-lingual support.
    - Uses i18next, one of the best localization tools available.
    - Supports nested folders to keep cleaner translation files
- 100% API coverage
- Custom(Redis) cache support
- Proxy WS support
- Proxy REST support
- Step by step guide
- GH Actions
  - Linter
  - Prettier
  - TSC
  - Deploy on release
- Readme badges
- Readme image/logo??
- Event Handlers
  - DMChatChannelCreated
  - ChatChannelBroadcastCall
  - ChatChannelBroadcastCallResponse
  - ChatChannelUpdated
  - ChatChannelTyping
  - ChatChannelHidden
  - ChatChannelNicknameChanged
  - ChatMessageCreated
  - ChatMessageUpdated
  - ChatMessageDeleted
  - ChatMessagesDeleted
  - ChatMessageReactionAdded
  - ChatMessageReactionDeleted
  - ChatPinnedMessageCreated
  - ChatPinnedMessageDeleted
  - TemporalChannelCreated
  - TemporalChannelUsersAdded
  - TEAEM_SOCKET_RECONNECTED
  - teamRolesUpdated
  - TeamXpAdded
  - TeamXpSet
  - teamReactionsUpdated
  - teamContentReactionsAdded
  - teamContentReactionsRemoved
  - TeamContentDeleted
  - TeamMessagesDeleted
  - teamThreadCreated
  - teamThreadReplyCreated
  - TeamEventModified
  - TeamEventCreated
  - TeamEventRemoved
  - TeamMemberJoined
  - TeamMemberRemoved
  - TeamMembersRemoved
  - TeamMutedMembersUpdated
  - TeamDeafenedMembersUpdated
  - TeamMemberAliasUpdated
  - TeamSubscriptionInfoUpdated
  - TeamStreamInfoUpdated
  - TeamContentOperationsApplied
  - TeamContentReplaced
  - TeamContentReplyAdded
  - TeamContentReplyRemoved
  - TeamAvailabilitiesUpdated
  - TeamChannelAvailabilitiesUpdated
  - TeamChannelAvailabilitiesRemoved
  - TeamMemberUpdated
  - TeamMemberSocialLinkUpdated
  - TeamGameAdded
  - TeamApplicationCreated
  - TeamApplicationRemoved
  - TeamApplicationUpdated
  - TeamUpdated
  - TeamChannelCreated
  - TeamChannelUpdated
  - TeamChannelPrioritiesUpdated
  - TeamChannelCategoryPrioritiesUpdated
  - TeamChannelDeleted
  - TeamChannelsDeleted
  - TeamChannelCategoryCreated
  - TeamChannelCategoryUpdated
  - TeamChannelCategoryDeleted
  - TeamChannelCategoriesDeleted
  - TeamChannelCategoryGroupMoved
  - TeamWebhookCreated
  - TeamWebhookUpdated
  - TeamBotCreated
  - TeamBotUpdated
  - TeamBotFlowUpdated
  - TeamGroupPrioritiesUpdated
  - TeamGroupDeleted
  - TeamGroupArchived
  - TeamGroupRestored
  - TeamGroupFollowed
  - TeamStripeAccountOnboarded
  - TeamServerSubscriptionPlanCreated
  - TeamServerSubscriptionPlanUpdated
  - TeamServerSubscriptionPlanDeleted
  - TeamServerSubscriptionUpdated
  - USER_SOCKET_CONNECTED
  - USER_SOCKET_CONNECT_ERROR
  - USER_SOCKET_RECONNECTED
  - USER_SOCKET_RECONNECTING
  - USER_ALIAS_UPDATED
  - USER_TEAM_MEMBER_STREAM_UPDATED
  - USER_PRESENCE_MANUALLY_SET
  - USER_PRESENCE_RECEIVED
  - USER_PINGED
  - USER_UPDATED
  - USER_TEAMS_UPDATED
  - USER_SOCIAL_LINK_UPDATED
  - USER_TEAM_SECTION_UNREAD_COUNT_INCREMENTED
  - USER_SCANNED_MOBILE_DOWNLOAD_QR
  - UserStreamsVisibilityUpdated
  - TEAM_CHANNEL_CONTENT_CREATED
  - TEAM_CHANNEL_CONTENT_CREATED_SILENT
  - TEAM_CHANNEL_CONTENT_REPLY_CREATED
  - TEAM_CHANNEL_CONTENT_REPLY_UPDATED
  - TEAM_CHANNEL_CONTENT_REPLY_DELETED
  - TEAM_CHANNEL_CONTENT_UPDATED
  - TEAM_CHANNEL_CONTENT_DELETED
  - TEAM_CHANNEL_ARCHIVED
  - TEAM_CHANNEL_RESTORED
  - TeamChannelVoiceParticipantAdded
  - TeamChannelVoiceParticipantRemoved
  - TeamChannelVoiceUserClientConnected
  - TeamChannelStreamUserClientConnected
  - TeamChannelStreamAdded
  - TeamChannelStreamRemoved
  - TeamChannelStreamActive
  - TeamChannelStreamEnded
  - TeamChannelVoiceUserMoved
  - CHANNEL_SEEN
  - CHANNEL_CONTENT_SEEN
  - CHANNEL_BADGED
  - CHANNEL_UNBADGED
  - TEAM_GROUP_CREATED
  - TEAM_GROUP_UPDATED
  - TEAM_GROUP_DELETED_FOR_USER
  - TEAM_USER_GROUP_PRIORITIES_UPDATED
  - TEAM_GROUP_MARKED_AS_READ
  - USER_MEDIA_UPLOAD_PROGRESS
  - VoiceChannelRegionPingReport
