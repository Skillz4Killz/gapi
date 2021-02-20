import { baseStructures } from "../base";
import Client from "../Client";
import Event from "./Event";

export default class BotClient extends Client {
    /** All your bot's arguments will be available here. */
    arguments = new baseStructures.Collection(this);
    /** All your bot commands will be available here */
    commands = new baseStructures.Collection(this);
    /** All your bot's events will be available here. */
    events = new baseStructures.Collection<string, Event>(this);
    /** All your bot's inhibitors will be available here. */
    inhibitors = new baseStructures.Collection(this);
    /** All your bot's monitors will be available here */
    monitors = new baseStructures.Collection(this);
    /** All your bot's tasks will be available here. */
    tasks = new baseStructures.Collection(this);
}