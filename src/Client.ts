import EventEmitter from 'events';
import { baseStructures } from './base';
import Team from './lib/Team';
import User from './lib/User';
import { ENDPOINTS } from './rest/endpoints';
import { structures } from './structures';
import Shard from './websocket/Shard';

export default class Client extends EventEmitter {
  /** The id of this client. */
  id = '';
  /** The email address used to log in. */
  email!: string;
  /** The password used to log in. */
  password!: string;
  /** How many milliseconds to wait for a shard to connect. */
  connectionTimeout = 30000;
  /** The default image width used for image getters */
  imageDefaultWidth = 128;
  /** The default image height used for image getters */
  imageDefaultHeight = 128;

  /** All the users currently cached/accessible to the client. */
  users = new baseStructures.Collection<string, User>(this);
  /** All the teams currently cached/accessible to the client. */
  teams = new baseStructures.Collection<string, Team>(this);

  /** The request manager that will manage your rate limits. */
  requestManager = new structures.RequestManager(this);
  /** The websocket manager that will manage your websocket connections */
  websocketManager = new structures.WebsocketManager(this);
  /** The events manager that will handle incoming websocket event payloads. */
  eventsManager = new structures.GuildedEvents(this);

  constructor(options: ClientOptions) {
    super();

    // LOOP OVER ALL OPTIONS OBJECT AND ASSIGN THE VALUE TO THE CLIENT
    for (const [key, value] of Object.entries(options)) {
      this[key as keyof ClientOptions] = value;
    }
  }

  /** Get the current client user from cache. Can be undefined if not cached. */
  get user() {
    return this.users.get(this.id);
  }

  /** Initiate the clients connection. */
  async connect() {
    // FIRST LOGIN TO GET COOKIES AND STUFF
    const login = await this.requestManager.login();
    this.id = login.user.id;

    // GATHER THE CLIENT DATA
    const botData = await this.requestManager.getClientData();
    this.emit('debug', `[DEBUG] Initial client data:`, botData);

    for (const team of botData.teams) {
      this.teams.set(team.id, new Team(this, team));
    }

    // TODO: SHARDING SUPPORT FOR LARGER CLIENTS
    this.websocketManager.connect(new Shard('0', this));

    return this;
  }

  /** Used to disconnect the client. */
  disconnect(reason = '') {
    this.emit('debug', `[DEBUG] Disconnecting`, reason);
  }

  /** Fetches a user. Set force to true, if you want to forcibly fetch from API and bypass cached users. */
  async fetchUser(id: string, force = false) {
    // IF USER IS CACHED JUST USE THAT
    if (!force && this.users.has(id)) return this.users.get(id);

    return this.requestManager.fetchUser(id);
  }
}

export interface ClientOptions {
  email: string;
  password: string;
}
