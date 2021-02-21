import Message from '../lib/Message';
import Team from '../lib/Team';
import BotClient from './Client';
import { Command } from './Command';

export default class Inhibitor {
  /** The client itself */
  client: BotClient;
  /** The name of the inhibitor. */
  name: string;

  constructor(client: BotClient, name: string) {
    this.client = client;
    this.name = name;
  }

  async execute(message: Message, command: Command, team: Team | undefined) {
    // Placeholder for the function that will run.
    if (message || command || team) return true;
    return true;
  }

  async init() {
    // Placeholder for when an inhibitor is initialized.
  }
}
