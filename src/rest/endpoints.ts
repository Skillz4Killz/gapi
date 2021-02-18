export const BASE_URL = 'https://api.guilded.gg';

export const ENDPOINTS = {
  /** Gets the value of the client. */
  me: `${BASE_URL}/me`,
  /** Logs in using email and password. */
  login: `${BASE_URL}/login`,
  /** Pings and keeps the connection alive */
  ping: `${BASE_URL}/users/me/ping`,

  // TEAM ENDPOINTS
  team: (id: string) => `${BASE_URL}/teams/${id}`,

  // USER ENDPOINTS
  user: (id: string) => `${BASE_URL}/users/${id}`,

  // MEMBER ENDPOINGS
  /** Edit a members nickname */
  nickname: (teamId: string, userId: string) => `${BASE_URL}/teams/${teamId}/members/${userId}/nickname`,

  // CHANNEL ENDPOINTS
  /** Fetches all channels for the team */
  channels: (id: string) => `${BASE_URL}/teams/${id}/channels`,
};

export type Endpoints = keyof typeof ENDPOINTS;
