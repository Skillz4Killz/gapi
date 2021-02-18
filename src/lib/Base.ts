import Client from '../Client';

export default class Base {
  /** The unique identifier for this object */
  id: string;
  /** The client object */
  client: Client;

  constructor(client: Client, id: string) {
    this.id = id;
    this.client = client;
  }
}
