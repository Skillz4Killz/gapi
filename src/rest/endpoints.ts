export const BASE_URL = 'https://www.guilded.gg/api';

export const ENDPOINTS = {
  /** Gets the value of the client. */
  me: `${BASE_URL}/me`,
  /** Logs in using email and password. */
  login: `${BASE_URL}/login`,
  /** Pings and keeps the connection alive */
  ping: `${BASE_URL}/users/me/ping`,
  /** Edits the client banner */
  clientBanner: `${BASE_URL}/users/me/profile/images/banner`,
  /** Ediits the client presence */
  clientPresence: `${BASE_URL}/users/me/presence`,

  // TEAM ENDPOINTS
  team: (id: string) => `${BASE_URL}/teams/${id}`,
  customReactions: (id: string) => `${BASE_URL}/teams/${id}/customReactions`,

  // GROUP ENDPOINTS
  groups: (id: string) => `${BASE_URL}/teams/${id}/groups`,

  // USER ENDPOINTS
  user: (id: string) => `${BASE_URL}/users/${id}`,

  // MEMBER ENDPOINGS
  /** Edit a members nickname */
  nickname: (teamId: string, userId: string) => `${BASE_URL}/teams/${teamId}/members/${userId}/nickname`,
  invite: (id: string) => `${BASE_URL}/invites/${id}`,
  roleUser: (teamId: string, roleId: string, userId: string) =>
    `${BASE_URL}/teams/${teamId}/roles/${roleId}/users/${userId}`,

  // CHANNEL ENDPOINTS
  /** Fetches all channels for the team */
  channels: (id: string) => `${BASE_URL}/teams/${id}/channels`,
  channelInfo: (teamId: string, groupId: string, channelId: string) =>
    `${BASE_URL}/teams/${teamId}/groups/${groupId}/channels/${channelId}/info`,

  // MESSAGE ENDPOINTS
  reaction: (channelId: string, messageId: string, id: string) =>
    `${BASE_URL}/channels/${channelId}/messages/${messageId}/reactions/${id}`,
  messages: (id: string) => `${BASE_URL}/channels/${id}/messages`,
  message: (channelId: string, id: string) => `${BASE_URL}/channels/${channelId}/messages/${id}`,
};

export type Endpoints = keyof typeof ENDPOINTS;
