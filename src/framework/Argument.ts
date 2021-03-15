import { Message } from '../lib/Message';
import { BotClient } from './Client';
import { Command, CommandArgument } from './Command';

export class Argument {
  /** The client itself */
  client: BotClient;
  /** The name of the argument. */
  name: string;

  constructor(client: BotClient, name: string) {
    this.client = client;
    this.name = name;
  }

  async execute(parameters: string[], message: Message, command: Command, arg: CommandArgument): Promise<any> {
    // Placeholder for the function that will run.
    if (parameters || message || command || arg) return;
  }

  async init() {
    // Placeholder for when an argument is initialized.
  }
}
