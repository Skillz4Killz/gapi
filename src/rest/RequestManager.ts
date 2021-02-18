import fetch from 'node-fetch';
import Client from '../Client';
import { GuildedTeam } from '../lib/Team';
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
        password: this.client.password
      },
      // TODO: HANDLE THIS BETTER! NECESSARY TO GET HEADERS
      returnRaw: true
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

  /** Creates the final request to be sent using headers and all necessary information for the api. */
  async request(
    url: string,
    data: {
      body?: Record<string, any>;
      method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT';
      returnRaw?: boolean;
    }
  ) {
    // TODO: make it an event
    console.log(url, data);

    const request = await fetch(url, {
      method: data.method,
      // GET CAN NOT HAVE BODY
      body: data.body && data.method !== 'GET' ? JSON.stringify(data.body) : undefined,
      headers: {
        ...(this.hmacSignedSession ? { hmac_signed_session: this.hmacSignedSession } : {}),
        ...(this.cookie ? { cookie: this.cookie } : {}),
        // GET AND DELETE SHOULD NOT SEND THIS HEADER
        ...(['GET', 'DELETE'].includes(data.method) ? {} : { 'Content-Type': 'application/json' })
      }
    });

    if (request.status < 200 || request.status > 299) {
    }

    return data.returnRaw ? request : await request.json().catch(console.error);
  }
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
                    }
                  ];
                  object: string;
                }
              ];
              object: string;
            }
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
    }
  ];
  reactionUsages: [
    {
      id: string;
      total: 9;
    }
  ];
}
