import BotClient from "./Client";

export default class Event {
    /** The client itself */
    client: BotClient;
    /** The name of the event. */
    name: string;
    /** Whether or not to execute this event once. */
    once = false;
    
    constructor(client: BotClient, name: string) {
        this.client = client;
        this.name = name;

        this.client.events.set(this.name, this);
    }

    async execute(...args: any[]) {
        // Placeholder for the execution handler for any event.
    }

    async init() {
        // Placeholder Will always run once when initializing this event.
    }
}