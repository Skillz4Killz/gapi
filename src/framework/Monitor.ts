import Message from '../lib/Message';
import BotClient from './Client';

export default class Monitor {
  /** The client itself */
  client: BotClient;
  /** The name of the task. */
  name: string;
  /** Whether this monitor should ignore messages that are sent by bots. By default this is true. */
  ignoreBots = true;
  /** Whether this monitor should ignore messages that are sent by others. By default this is false.*/
  ignoreOthers = false;
  /** Whether this monitor should ignore messages that are edited. By default this is false.*/
  ignoreEdits = false;
  /** Whether this monitor should ignore messages that are sent in DM. By default this is true. */
  ignoreDM = true;
  // TODO: Fix this once i have better understanding of guilded permissions
  /** The permissions you want to check if the message author has from their roles. */
  //   userTeamPermissions?: Permission[];
  /** The permissions you want to check if the message author has in this channel where the command is used. */
  //   userChannelPermissions?: Permission[];
  /** The permissions the BOT must have from it's roles. */
  //   botTeamPermissions?: Permission[];
  /** The permissions the BOT must have in the current channel. */
  //   botChannelPermissions?: Permission[];

  constructor(client: BotClient, name: string) {
    this.client = client;
    this.name = name;

    this.client.monitors.set(name, this);
  }

  // @ts-ignore
  async execute(message: Message) {
    // Placeholder for the execution handler for this task.
  }

  async init() {
    // Placeholder for anything you would like to run when this task is first created.
    // For example, making sure some tables exist in the database.
  }
}
