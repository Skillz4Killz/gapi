import BotClient from "./Client";

export default class Task {
    /** The client itself */
    client: BotClient;
    /** The name of the task. */
    name: string;
    /** The interval to run this task in milliseconds. By default, this is 1 minute. */
    intervalMilliseconds = 60000;
    /** Whether or not this task should be executed as soon as bot is starting up. */
    executeOnStartup = false;

    constructor(client: BotClient, name: string) {
        this.client = client;
        this.name = name;

        this.client.tasks.set(name, this);
    }

    async execute() {
        // Placeholder for the execution handler for this task.
    }

    async init() {
        // Placeholder for anything you would like to run when this task is first created.
        // For example, making sure some tables exist in the database.
    }
}