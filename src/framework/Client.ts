import i18next from 'i18next';
import path from 'path';
import Client, { ClientOptions } from '../Client';
import Message from '../lib/Message';
import Collection from '../utils/Collection';
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
  arguments = new Collection<string, Argument>(this);
  /** All your bot commands will be available here */
  commands = new Collection<string, Command>(this);
  /** All your bot's events will be available here. */
  events = new Collection<string, Event>(this);
  /** All your bot's inhibitors will be available here. */
  inhibitors = new Collection<string, Inhibitor>(this);
  /** All your bot's monitors will be available here */
  monitors = new Collection<string, Monitor>(this);
  /** All your bot's tasks will be available here. */
  tasks = new Collection<string, Task>(this);
  /** The bot's default prefix */
  prefix: string;
  /** The bot's prefixes per team. <teamId, prefix> */
  prefixes = new Map<string, string>();
  /** The languages per team. <teamId, language> */
  languages = new Map<string, string>();
  /** The path that the end users commands,monitors, inhibitors and others will be located. */
  sourceFolderPath: string;

  constructor(options: BotClientOptions) {
    super(options);

    this.prefix = options.prefix;
    this.sourceFolderPath = options.sourceFolderPath || path.join(process.cwd(), 'src/');

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
          if (piece.init) await piece.init();
        }
      }),
    );

    // Load all end user files
    await Promise.all(
      [
        ['arguments', this.arguments] as const,
        ['commands', this.commands] as const,
        ['inhibitors', this.inhibitors] as const,
        ['monitors', this.monitors] as const,
        ['tasks', this.tasks] as const,
      ].map(async ([dir, collection]) => {
        console.log(path.join(this.sourceFolderPath, dir));
        for await (const result of walk(path.join(this.sourceFolderPath, dir))) {
          if (!result) return;

          const [filename, file] = result;
          const name = filename.substring(0, filename.length - 2);
          const piece = file.default ? new file.default(this, name) : new file(this, name);
          collection.set(piece.name || name, piece);
          if (piece.init) await piece.init();
        }
      }),
    );

    this.initializeMessageListener();
    this.initializeTasks();
    this.on('reactionAdded', payload => {
      // TODO: convert payload into message
      this.processReactionCollector(payload);
    });
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
        console.log(`${bgBlue(`[${this.getTime()}]`)} [TASK: ${bgYellow(black(task.name))}] Started.`);
        await task.execute().catch(console.log);

        setInterval(async () => {
          console.log(`${bgBlue(`[${this.getTime()}]`)} [TASK: ${bgYellow(black(task.name))}] Started.`);
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

  /** This function helps translate the string to the specific teams needs. */
  translate(teamId: string, key: string, options?: Record<string, unknown>, returnArray?: true): string[];
  translate(teamId: string, key: string, options?: Record<string, unknown>, returnArray?: false): string;
  translate(teamId: string, key: string, options?: Record<string, unknown>, returnArray = false) {
    const team = this.teams.get(teamId);
    const language = this.languages.get(teamId) || team?.locale || 'en_US';

    // undefined is silly bug cause i18next dont have proper typings
    const languageMap =
      i18next.getFixedT(language.replace('-', '_'), undefined) || i18next.getFixedT('en_US', undefined);

    if (returnArray) return languageMap(key, { ...options, returnObjects: true }) as string[];
    return languageMap(key, options) as string;
  }

  processReactionCollector(message: Message) {
    // TODO: forward to channel.processReactionCollector
    console.log(message);
  }
}

export interface BotClientOptions extends ClientOptions {
  prefix: string;
  sourceFolderPath?: string;
}
