import { Collection, BASE_URL } from "../..";
import { Client } from "../Client";
import { Shard } from "./Shard";

export class WebsocketManager extends Collection<string, Shard> {
  /** The client itself */
  client: Client;
  /** The base websocket url */
  url = `wss://${BASE_URL}/socket.io/?jwt=undefined&EIO=3&transport=websocket`;

  constructor(client: Client) {
    super(client);
    this.client = client;
  }

  /** Connects to the Guilded gateway websocket if possible. */
  connect(shard: Shard) {
    this.set(shard.id, shard);
    shard.connect();
  }
}
