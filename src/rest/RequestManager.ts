import fetch from 'node-fetch';
import Client from '../Client';
import { GuildedTeam } from '../lib/Team';
import { structures } from '../structures';
import { ENDPOINTS } from './endpoints';

export default class RequestManager {
  /** The client itself */
  client: Client;
  /** The signed session information */
  hmacSignedSession = '';
  /** The cookie for this session */
  cookie = '';

  constructor(client: Client) {
    this.client = client;
  }

  /** Get the current clients data. */
  getClientData() {
    return this.get(ENDPOINTS.me) as Promise<GuildedClientData>;
  }

  /** Sends the request to login the client. */
  async login() {
    const data = (await this.post(ENDPOINTS.login, {
      body: {
        email: this.client.email,
        password: this.client.password,
      },
      // TODO: HANDLE THIS BETTER! NECESSARY TO GET HEADERS
      returnRaw: true,
      // TODO: fix any
    })) as any;

    this.cookie = data.headers.get('Set-Cookie');
    if (!this.cookie) throw new Error('Unable to login, most likely due to incorrect email or password!');

    this.hmacSignedSession = this.cookie.substring(this.cookie.indexOf('=') + 1, this.cookie.indexOf(';'));

    return data.json();
  }

  /** Sends a ping request to maintain the connection alive. */
  async ping() {
    return this.request(ENDPOINTS.ping, { method: 'PUT' });
  }

  /** Sends a get request to the api. */
  async get(url: string) {
    return this.request(url, { method: 'GET' });
  }

  /** Sends a post request to the api. */
  async post(url: string, body?: Record<string, any>) {
    return this.request(url, { method: 'POST', ...body });
  }

  /** Sends a put request to the api. */
  async put(url: string, body?: Record<string, any>) {
    return this.request(url, { method: 'PUT', ...body });
  }

  /** Sends a delete request to the api. */
  async delete(url: string, body?: Record<string, any>) {
    return this.request(url, { method: 'DELETE', ...body });
  }

  /** Creates the final request to be sent using headers and all necessary information for the api. */
  async request(
    url: string,
    data: {
      body?: Record<string, any>;
      method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
      returnRaw?: boolean;
    },
  ) {
    // TODO: make it an event
    this.client.emit('rawREST', url, data);

    const request = await fetch(url, {
      method: data.method,
      // GET CAN NOT HAVE BODY
      body: data.body && data.method !== 'GET' ? JSON.stringify(data.body) : undefined,
      headers: {
        ...(this.hmacSignedSession ? { hmac_signed_session: this.hmacSignedSession } : {}),
        ...(this.cookie ? { cookie: this.cookie } : {}),
        // GET AND DELETE SHOULD NOT SEND THIS HEADER
        ...(['GET', 'DELETE'].includes(data.method) ? {} : { 'Content-Type': 'application/json' }),
      },
    });

    return data.returnRaw ? request : await request.json().catch(console.error);
  }

  // TEAM METHODS

  /** Fetches a team. */
  async fetchTeam(id: string) {
    const team = await this.get(ENDPOINTS.team(id));
    return this.client.teams.set(id, new structures.Team(this.client, team)).get(id);
  }

  async fetchCustomReactions(id: string, _force = false, _cache = true) {
    // IF IT IS IN CACHE USE IT
    // if (!force)

    const data = await this.get(ENDPOINTS.customReactions(id));
    // TODO: return structures instead
    // const reactions = data.map(d => makeReaction)
    return data;
  }

  // GROUP METHODS

  /** Fetches all the groups for a team. */
  async fetchGroups(id: string, cache = true) {
    if (!cache) return this.get(ENDPOINTS.groups(id));

    const groups = await this.get(ENDPOINTS.groups(id));
    for (const _group of groups) {
      // TODO: Create a group and cache it
    }

    // TODO: return cached structures instead
    return groups;
  }

  // MEMBER RELATED METHODS
  /** Edit the nickname of a user */
  editNickname(teamId: string, userId: string, nickname: string) {
    return this.put(ENDPOINTS.nickname(teamId, userId), { nickname });
  }

  /** Accept an invite */
  acceptInvite(id: string) {
    return this.put(ENDPOINTS.invite(id), { type: 'consume' });
  }

  /** Add a role to a user */
  addRole(teamId: string, roleId: string, userId: string) {
    return this.put(ENDPOINTS.roleUser(teamId, roleId, userId));
  }

  /** Remove a role from a user */
  removeRole(teamId: string, roleId: string, userId: string) {
    return this.delete(ENDPOINTS.roleUser(teamId, roleId, userId));
  }

  /** Fetches a user. */
  async fetchUser(id: string) {
    const user = await this.get(ENDPOINTS.user(id));
    return this.client.users.set(id, new structures.User(this.client, user)).get(id);
  }

  // CHANNEL RELATED METHODS
  /** Fetch all the channels in a team. Set force to true to bypass cache and get the results from api. Set cache to false if you do not want to cache the channels once fetched. */
  async fetchChannels(teamId: string, _force = false, cache = true) {
    // TODO: enable this once channel structures are done
    // if (!force && this.client.teams.get(teamId).channels.size) return this.client.teams.get(teamId).channels;

    if (!cache) return this.get(ENDPOINTS.channels(teamId));

    const channelData = await this.get(ENDPOINTS.channels(teamId));
    return channelData;

    // TODO: return the structures instead and cache the structurs
    // return channelData.map(c => createChannel())
  }

  /** Edit a channels info */
  editChannelInfo(
    teamId: string,
    groupId: string,
    channelId: string,
    options: { name?: string; description?: string; isPublic?: boolean } = {},
  ) {
    return this.put(ENDPOINTS.channelInfo(teamId, groupId, channelId), options);
  }

  // MESSAGE RELATED METHODS

  /** Removes a reaction from a message */
  removeReaction(channelId: string, messageId: string, id: string) {
    return this.delete(ENDPOINTS.reaction(channelId, messageId, id));
  }

  /** Adds a reaction to a message */
  addReaction(channelId: string, messageId: string, id: string) {
    return this.post(ENDPOINTS.reaction(channelId, messageId, id));
  }

  /** Fetch all messages on a channel */
  fetchMessages(id: string) {
    return this.get(ENDPOINTS.messages(id));
  }

  /** Delete a message */
  deleteMessage(channelId: string, id: string) {
    return this.delete(ENDPOINTS.message(channelId, id));
  }

  /** Edit the clients banner */
  editClientBanner(url: string) {
    return this.post(ENDPOINTS.clientBanner, { imageUrl: url })
  }

  /** Edit the clients presence */
  editPresence(status: PresenceStatuses | keyof typeof PresenceStatuses) {
    return this.post(ENDPOINTS.clientPresence, { status: typeof status === "string" ? PresenceStatuses[status] : status })
  }
}

export enum PresenceStatuses {
  ONLINE = 1,
  IDLE,
  DO_NOT_DISTURB,
  INVISIBLE
}


// TODO: THIS COULD BE BETTER
export interface GuildedClientData {
  updateMessage: null;
  user: {
    id: string;
    name: string;
    profilePictureSm: string;
    profilePicture: string;
    profilePictureLg: string;
    profilePictureBlur: string;
    profileBannerBlur: string;
    profileBannerLg: string;
    profileBannerSm: string;
    joinDate: string;
    steamId: null;
    userStatus: {
      // Your custom status
      content: {
        object: string;
        document: {
          data: {};
          nodes: [
            {
              data: {};
              type: string;
              nodes: [
                {
                  leaves: [
                    {
                      text: string;
                      marks: [];
                      object: string;
                    },
                  ];
                  object: string;
                },
              ];
              object: string;
            },
          ];
          object: string;
        };
      };
      customReactionId: string;
      customReaction: {
        id: string;
        name: string;
        png: string;
        webp: string;
        apng: null;
      };
    };
    subdomain: string;
    moderationStatus: null;
    aboutInfo: {
      bio: string;
      tagLine: string;
    };
    lastOnline: string;
    aliases: [];
    email: string;
    blockedUsers: [];
    socialLinks: [];
    userPresenceStatus: string;
    badges: [];
    canRedeemGold: boolean;
    isUnrecoverable: boolean;
    devices: [];
    userChannelNotificationSettings: [];
    upsell: {
      type: string;
      activationType: string;
      topic: string;
      includedUpsellSpecs: [];
      localStageStats: {
        getDesktopApp: string;
        getMobileApp: string;
      };
      entityId: string;
      includedUpsells: [];
    };
  };
  teams: GuildedTeam[];
  customReactions: [
    {
      createdBy: string;
      teamId: string;
      png: string;
      webp: string;
      apng: string;
      name: string;
      id: string;
      aliases: [];
    },
  ];
  reactionUsages: [
    {
      id: string;
      total: 9;
    },
  ];
}
