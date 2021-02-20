import { baseStructures } from '../base';
import Client, { ClientOptions } from '../Client';
import Message from '../lib/Message';
import { Command } from './Command';
import Event from './Event';
import Monitor from './Monitor';
import Task from './Task';

export default class BotClient extends Client {
  /** All your bot's arguments will be available here. */
  arguments = new baseStructures.Collection(this);
  /** All your bot commands will be available here */
  commands = new baseStructures.Collection<string, Command>(this);
  /** All your bot's events will be available here. */
  events = new baseStructures.Collection<string, Event>(this);
  /** All your bot's inhibitors will be available here. */
  inhibitors = new baseStructures.Collection(this);
  /** All your bot's monitors will be available here */
  monitors = new baseStructures.Collection<string, Monitor>(this);
  /** All your bot's tasks will be available here. */
  tasks = new baseStructures.Collection<string, Task>(this);

  constructor(options: BotClientOptions) {
    super(options);

    this.init();
  }

  /** Load all the files for the bot. */
  init() {
    // TODO: Load all internal files
    // TODO: Load all end user files

    this.initializeMessageListener();
  }

  /** Handler that is run on messages and can  */
  processMonitors(message: Message) {
    this.monitors.forEach(monitor => {
      // TODO: figure out how to detect bots
      // if (monitor.ignoreBots && message.bot) return;
      // IF THE MONITOR IGNORES OTHERS
      if (monitor.ignoreOthers && message.authorId !== this.id) return;
      // IGNORE EDITED MESSAGES
      // TODO: Figure out how to detect edited messages
      // if (monitor.ignoreEdits && message.editedTimestamp) return;
      // IGNORE DMS
      // TODO: figure out how to detect dms
      // if (monitor.ignoreDM && !message.teamId) return;
    });
  }

  /** Allows users to override and customize the addition of a event listener */
  initializeMessageListener() {
      this.on('messageCreated', (message) => this.processMonitors(message))
  }
}

export interface BotClientOptions extends ClientOptions {
  prefix: string;
}
