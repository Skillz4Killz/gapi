export const BASE_URL = 'https://api.guilded.gg';

export const ENDPOINTS = {
  /** Gets the value of the client. */
  me: `${BASE_URL}/me`,
  /** Logs in using email and password. */
  login: `${BASE_URL}/login`,
  /** Pings and keeps the connection alive */
  ping: `${BASE_URL}/users/me/ping`
};

export type Endpoints = keyof typeof ENDPOINTS;
