export enum BotPermissions {
  /** Allows you to create and edit bots using the automated workflow. */
  MANAGE_BOTS = 1,
}

export enum BracketPermissions {
  /** Allows you to report match scores on behalf of your server. */
  REPORT_SCORES = 1,
  /** Allows you to view the brackets for the tournaments. */
  VIEW_BRACKETS,
}

export enum CalendarPermissions {
  /** Allows you to create events. */
  CREATE_EVENTS = 1,
  /** Allows you to view events. */
  VIEW_EVENTS,
  /** Allows you to manage events */
  MANAGE_EVENTS = 4,
  /** Allows you to remove events created by others. */
  REMOVE_EVENTS = 8,
  /** Allows you to edit RSVP status for members in an event. */
  EDIT_RSVP = 16,
}

export enum ChatPermissions {
  /** Allows you to send chat messages */
  SEND_MESSAGES = 1,
  /** Allows you to read chat messages. */
  READ_MESSAGES,
  /** Allows you to pin messages or delete message from other users. */
  MANAGE_MESSAGES,
  /** Allows you to create threads in this channel. */
  CREATE_THREADS = 16,
  /** Allows you to reply to threads in this channel. */
  SEND_THREAD_MESSAGE = 32,
  /** Allows you to archive and restore threads. */
  MANAGE_THREADS = 64,
}

export enum CustomPermissions {
  /** Allows you to create/manage the custom server emojis. */
  MANAGE_EMOJIS = 1,
  /** Allows you to change your own nickname. */
  CHANGE_NICKNAME = 16,
  /** Allows you to change the nickname of others. */
  MANAGE_NICKNAME = 32,
}

export enum DocPermissions {
  /** Allows you to create docs */
  CREATE_DOCS = 1,
  /** Allows you to view docs */
  VIEW_DOCS,
  /** Allows you to update docs created by others or move them to another channel */
  MANAGE_DOCS = 4,
  /** Allows you to remove docs made by others. */
  REMOVE_DOCS = 8,
}

export enum FormPermissions {
  /** Allows you to view all form responses. */
  FORM_RESPONSES = 2,
  /** Allows you to view all poll results. */
  POLL_RESULTS = 16,
}

export enum ForumPermissions {
  /** Allows you to create forum topics. */
  CREATE_TOPICS = 1,
  /** Allows you to read forums. */
  READ_FORUMS,
  /** Allows you to remove topics and replies from others or move to another channel */
  MANAGE_TOPICS = 4,
  /** Allows you to sticky a topic */
  STICKY_TOPICS = 16,
  /** Allows you to lock a topic */
  LOCK_TOPICS = 32,
  /** Allows you to create topic replies */
  CREATE_TOPIC_REPLIES = 64,
}

export enum GeneralPermissions {
  /** Allows you to update the server */
  UPDATE_SERVER = 4,
  /** Allows you to directly invite members to the server. */
  INVITE_MEMBERS = 16,
  /** Allows you to kick or ban members from the server. */
  KICK_BAN_MEMBERS = 32,
  /** Allows you to create new, edit, or delete channels from the server. */
  MANAGE_CHANNELS = 1024,
  /** Allows you to create new, edit, or delete webhooks from the server. */
  MANAGE_WEBHOOKS = 2048,
  /** Allows you to create new, edit, or delete groups from the server. */
  MANAGE_GROUPS = 4096,
  /** Allows you to use @everyone and @here mentions */
  MENTION_EVERYONE_HERE = 8192,
  /** Allows you to update the server roles. */
  MANAGE_ROLES = 16384,
}

export enum ListPermissions {
  /** Allows you to create list items */
  CREATE_LIST_ITEM = 1,
  /** Allows you to view list items */
  VIEW_LIST_ITEMS,
  /** Allows you to edi list item messages by others and move them to other channels. */
  MANAGE_LIST_ITEMS = 4,
  /** Allows you to remove list items created by others */
  REMOVE_LIST_ITEMS = 8,
  /** Allows you to complete list items created by others */
  COMPLETE_LIST_ITEMS = 16,
  /** Allows you to reorder list items */
  REORDER_LIST_ITEMS = 32,
}

export enum MatchmakingPermissions {
  /** Allows you to create matchmaking scrims */
  CREATE_SCRIMS = 1,
  /** Allows you to use the server to create and manage tournaments */
  REGISTER_FOR_TOURNAMENTS = 4,
  /** Allows you to register the server for tournaments */
  CREATE_TOURNAMENTS = 16,
}

export enum MediaPermissions {
  /** Allows you to create media */
  CREATE_MEDIA = 1,
  /** Allows you to see media */
  SEE_MEDIA,
  /** Allows you to edit media created by others and move to another channel */
  MANAGE_MEDIA = 4,
  /** Allows you to remove media created by others */
  REMOVE_MEDIA = 8,
}

export enum RecruitmentPermissions {
  /** Allows you to approve server and game applications */
  APPROVE_APPLICATIONS = 1,
  /** Allows you to view server and game applications */
  VIEW_APPLICATIONS,
  /** Allows you to edit server and game applications, and toggle accepting applications */
  EDIT_APPLICATIONS = 4,
  /** Allows you to indicate interest in a player instead of upvote */
  INDICATE_INTEREST = 16,
  /** Allows you to modify the find player statys for server listing card */
  MODIFY_STATUS = 32,
}

export enum SchedulingPermissions {
  /** Allows you to let server know your available schedule */
  CREATE_SCHEDULE = 1,
  /** Allows you to view server member's schedule */
  VIEW_SCHEDULES,
  /** Allows you to remove availabilities created by others */
  DELETE_SCHEDULE = 8,
}

export enum StreamPermissions {
  /** Allows you to add a stream and also talk in the streams channel */
  ADD_STREAM = 1,
  /** Allows you to view streams */
  VIEW_STREAMS,
  /** Allows you to talk in stream channel */
  JOIN_VOICE = 16,
  /** Allows you to send message in stream channel */
  SEND_MESSAGES = 32,
}

export enum VoicePermissions {
  /** Allows you to talk in voice chat */
  ADD_VOICE = 1,
  /** Allows you to listen to voice chat */
  HEAR_VOICE,
  /** Allows you to move members to other voice rooms */
  MOVE_MEMBERS = 16,
  /** Allows you to prioritize your voice when speaking in voice chat */
  PRIORITY_SPEAKER = 32,
  /** Allows you to use voice activity input mode from voice chats */
  VOICE_ACTIVITY = 64,
  /** Allows you to mute members in voice chats */
  MUTE_MEMBER = 128,
  /** Allows you to deafen members in voice chats */
  DEAFEN_MEMBERS = 256,
  /** Allows you to create, rename, and delete voice rooms */
  MANAGE_VOICE_ROOMS = 512,
  /** Allows you to broadcast your voice to lower in hierarchy when speaking in voice channels */
  BROADCAST = 1024,
  /** Allows you to direct your voice to specific users */
  WHISPER = 2048,
  /** Allows you to send chat messages in the voice channel */
  SEND_MESSAGE = 4096,
}
