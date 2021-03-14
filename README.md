# gapi / gupi

[![CI](https://github.com/Skillz4Killz/gapi/actions/workflows/CI.yml/badge.svg)](https://github.com/Skillz4Killz/gapi/actions/workflows/CI.yml)
![npm](https://img.shields.io/npm/v/gupi)
[![Guilded](https://img.shields.io/badge/Guilded%20Server-Click%20To%20Join!-yellow)](https://www.guilded.gg/i/Vkb5LVP2)

A TypeScript NodeJS API Wrapper for Guilded.gg API.

![image](https://img.guildedcdn.com/ContentMedia/cddfebfa0ca84afd72f2a6bdc55bb158-Full.webp?w=713&h=130)

> Currently unstable and in active dev. Use with caution.

> The name is gapi but silly google took that name so on npm we use gupi

# Design Goals

- Amazing Scalability!
- Great developer experience!
- Extremely flexible/dynamic!

## Features

- [x] Initial Connection
  - [x] Handle closes/Reconnection
- [x] Advanced RAM control!
  - [x] Add custom props
  - [x] Remove undesired props to save RAM
  - [x] Limit the max amount of items in a collection.
- [x] Basic Cache control
- [x] Clean and powerful events system
  - [x] Event listeners that are ran when an event occurs.
  - [x] Useful events available to help debug!
- [x] Clean and powerful tasks system.
  - [x] Runs a function at a certain interval. Useful for things like unmute and updating bot lists etc.
  - [x] Can be used for cache sweeping to keep your cache optimized for exactly what you want.
- [x] Clean and powerful monitors system.
  - [x] Runs a function on every message sent. Useful for stuff like auto-moderation or tags.
  - [ ] Easily ignore bots, users, edits, dms.
  - [ ] Powerful permission checks.
- [x] Clean and powerful inhibitors system
  - [x] Stops a command from running if a requirement fails.
  - [x] Easily add custom inhibitors!
- [ ] Clean and powerful commands system
  - [x] Powerful argument handling including validating, parsing and modifications.
  - [x] Easily create custom arguments for your specific needs.
  - [x] Command aliases.
  - [x] Cooldowns and allowed uses before cooldown triggers.
  - [x] Argument prompting!
  - [ ] Author and bot permission checks in server AND in channel!
- [x] Clean and powerful languages system.
  - [x] Built in multi-lingual support.
  - [x] Uses i18next, one of the best localization tools available.
  - [x] Supports nested folders to keep cleaner translation files
- [x] GH Actions
  - [x] Linter
  - [x] Prettier
  - [x] TSC
- [x] Event Handlers
- [ ] 100% API coverage
- [ ] Custom(Redis) cache support
- [ ] Step by step guide
- [ ] GH Actions: Deploy on release
- [ ] Readme image/logo??
- [ ] Proxy WS support (Pending until sharding is implemented in Guilded)
- [ ] Proxy REST support (Pending until Rate Limits are better implemented in Guilded)

# Usage

## Beginner/Basic

```ts
import { Client } from 'gupi';

new Client({ email: 'emailhere', password: 'passwordhere' })
  .on('ready', () => console.log('Successfully connected to gateway'))
  .on('messageCreate', message => {
    if (message.content === '!ping') {
      // TODO: pending
    }
  })
  .on('unknown', console.log)
  .connect();
```

## BotClient (Full Command Framework)

```ts
// index.ts
import { BotClient } from 'gupi';
import configs from './configs';

// Start it up!
const client = new BotClient(configs).on('ready', () => console.log('Successfully connected to gateway')).connect();

// src/commands/avatar.ts
import { Command, CommandArgument, Message, User, Embed } from 'gupi';

export default class extends Command {
  name = 'avatar';
  aliases = ['pfp'];
  description = '🖼️ View the avatar image for a user or the server.';
  arguments = [
    { name: 'server', type: 'string', literals: ['server'], required: false },
    { name: 'user', type: 'user', required: false },
  ] as CommandArgument[];

  async execute(message: Message, args: { user?: User; server?: 'server' }) {
    // BY DEFAULT WE USE THE USERS OWN URL
    let url = message.author.dynamicAvatarURL({ type: 'Large' });
    // IF THE USER WANTED THE SERVER AVATAR USE IT
    if (args.server && message.team) url = message.team.dynamicAvatarURL({ type: 'Large' });
    // IF A USER WAS REQUESTED, THEN WE USE THAT
    if (args.user) url = args.user.dynamicAvatarURL({ type: 'Large' });

    return message.send(
      new Embed()
        .setAuthor(message.author)
        .setDescription(`[${message.translate('commands/avatar:DOWNLOAD_LINK')}](${url})`)
        .setImage(url),
    );
  }
}
```

![image](https://user-images.githubusercontent.com/23035000/111086232-6d42a100-84f1-11eb-949a-b7de53bd3984.png)

## Advanced Customizations

Everything below this is to showcase examples of advanced features! They are intentionally written in a way that is confusing to a beginner developer, as it is not meant for you. This is an extreme edge case scenario for bots that scale really big!

```ts
// Cache Control!
// Set to 0 to disable caching. Apply to any desired Collection.
client.users.maxSize = 1000;

client.connect();
```
