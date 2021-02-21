import path from 'path';
import { baseStructures } from '../base';
import Client, { ClientOptions } from '../Client';
import Message from '../lib/Message';
import { bgBlue, bgYellow, black } from '../utils/colorette';
import { walk } from '../utils/walk';
import Argument from './Argument';
import { Command } from './Command';
import Event from './Event';
import Inhibitor from './Inhibitor';
import Monitor from './Monitor';
import Task from './Task';

export default class BotClient extends Client {
  /** All your bot's arguments will be available here. */
  arguments = new baseStructures.Collection<string, Argument>(this);
  /** All your bot commands will be available here */
  commands = new baseStructures.Collection<string, Command>(this);
  /** All your bot's events will be available here. */
  events = new baseStructures.Collection<string, Event>(this);
  /** All your bot's inhibitors will be available here. */
  inhibitors = new baseStructures.Collection<string, Inhibitor>(this);
  /** All your bot's monitors will be available here */
  monitors = new baseStructures.Collection<string, Monitor>(this);
  /** All your bot's tasks will be available here. */
  tasks = new baseStructures.Collection<string, Task>(this);
  /** The bot's default prefix */
  prefix: string;
  /** The bot's prefixes per team. <teamId, prefix> */
  prefixes = new Map<string, string>();

  constructor(options: BotClientOptions) {
    super(options);

    this.prefix = options.prefix;

    this.init();
  }

  /** Load all the files for the bot. */
  async init() {
    await Promise.all(
      [
        ['arguments', this.arguments] as const,
        ['commands', this.commands] as const,
        ['inhibitors', this.inhibitors] as const,
        ['monitors', this.monitors] as const,
        ['tasks', this.tasks] as const,
      ].map(async ([dir, collection]) => {
        for await (const result of walk(path.join(__dirname, `./internal/${dir}/`))) {
          if (!result) return;

          const [filename, file] = result;
          const name = filename.substring(0, filename.length - 2);
          const piece = file.default ? new file.default(this, name) : new file(this, name);
          collection.set(piece.name || name, piece);
        }
      }),
    );

    // TODO: Load all end user files

    this.initializeMessageListener();
    this.initializeTasks();
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

      monitor.execute(message);
    });
  }

  /** Allows users to override and customize the addition of a event listener */
  initializeMessageListener() {
    this.on('messageCreated', message => this.processMonitors(message));
  }

  /** Allows usersto override and customize the initialization of tasks */
  initializeTasks() {
    this.tasks.forEach(async task => {
      // THESE TASKS MUST RUN WHEN STARTING BOT
      if (task.executeOnStartup) await task.execute().catch(console.log);

      // WILL CREATE THE INTERVAL AT THE TIME THIS TASK SHOULD RUN.
      setTimeout(async () => {
        console.log(`${bgBlue(`[${this.getTime()}]`)} => [TASK: ${bgYellow(black(task.name))}] Started.`);
        await task.execute().catch(console.log);

        setInterval(async () => {
          console.log(`${bgBlue(`[${this.getTime()}]`)} => [TASK: ${bgYellow(black(task.name))}] Started.`);
          await task.execute().catch(console.log);
        }, task.intervalMilliseconds);
        // THE AMOUNT OF TIME UNTIL THE NEXT EXECUTION POINT
      }, Date.now() % task.intervalMilliseconds);
    });
  }

  /** Gets the current time, in a human readable format. Useful for logs. */
  getTime() {
    const now = new Date();
    const hours = now.getHours();
    const minute = now.getMinutes();

    let hour = hours;
    let amOrPm = `AM`;
    if (hour > 12) {
      amOrPm = `PM`;
      hour = hour - 12;
    }

    return `${hour >= 10 ? hour : `0${hour}`}:${minute >= 10 ? minute : `0${minute}`} ${amOrPm}`;
  }

  /** Handler that can be customized by user that runs whenever a command errors out. */
  handleCommandError(message: Message, command: Command, error: any) {
    // PLACEHOLDER JUST TO SHUT UP THE ERRORS. THIS SHOULD BE CUSTOMIZED BY USER
    if (!message) console.log('command failed', command, error);
  }
}

export interface BotClientOptions extends ClientOptions {
  prefix: string;
}
