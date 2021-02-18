import Message from './lib/Message';
import Team from './lib/Team';
import User from './lib/User';
import RequestManager from './rest/RequestManager';
import GuildedEvents from './websocket/Events';
import Shard from './websocket/Shard';
import WebsocketManager from './websocket/WebsocketManager';

export const structures = {
  Message,
  Team,
  User,
  RequestManager,
  GuildedEvents,
  Shard,
  WebsocketManager
};
