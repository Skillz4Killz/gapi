export const BASE_URL = 'https://api.guilded.gg';

export const ENDPOINTS = {
  /** Gets the value of the client. */
  me: `${BASE_URL}/me`,
  /** Logs in using email and password. */
  login: `${BASE_URL}/login`,
  /** Pings and keeps the connection alive */
  ping: `${BASE_URL}/users/me/ping`,

  // MEMBER ENDPOINGS
  /** Edit a members nickname */
  nickname: (teamId: string, userId: string) => `${BASE_URL}/teams/${teamId}/members/${userId}/nickname`,
};

export type Endpoints = keyof typeof ENDPOINTS;
