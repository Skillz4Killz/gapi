# gapi / gupi

[![CI](https://github.com/Skillz4Killz/gapi/actions/workflows/CI.yml/badge.svg)](https://github.com/Skillz4Killz/gapi/actions/workflows/CI.yml)
![npm](https://img.shields.io/npm/v/gupi)
[![Guilded](https://img.shields.io/badge/Guilded%20Server-Click%20To%20Join!-yellow)](https://www.guilded.gg/i/Vkb5LVP2)

A TypeScript NodeJS API Wrapper for Guilded.gg API.

![image](https://img.guildedcdn.com/ContentMedia/cddfebfa0ca84afd72f2a6bdc55bb158-Full.webp?w=713&h=130)

> Currently unstable and in active dev. Use with caution.

> The name is gapi but silly google took that name so on npm we use gupi

## This lib is not being built to be used! It is an experiment for me to learn and grow as a developer.

# Design Goals

- Best Scalability!
- Best developer experience!
- Extremely flexible/dynamic!
- Keep close to API as possible

## Features

This list is completed features that are currently finished. The full feature list will only be ready when the TODO list is completed.

- [x] Initial Connection
  - [x] Handle closes/Reconnection
- [x] Custom structures support
  - [x] Add custom props
  - [x] Remove undesired props to save RAM
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
- [x] GH Actions
  - [x] Linter
  - [x] Prettier
  - [x] TSC
- [x] Event Handlers

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

## Advanced

```ts
import { Client, baseStructures, structures } from 'gupi';

// Override any internal structures without having to fork and maintain headaches.
baseStructures.Base = class {
  // Adding custom props
  newProp: 'success';
  // On the opposite side, use this to remove any props you don't want to save RAM/cache!

  // Adding custom getters
  get newGetter() {
    return true;
  }

  // Add custom methods
  newMethod() {
    return true;
  }
};

// Most commonly used structures
structures.Message = class extends baseStructures.Base {
  // Same as above. Everything is customizable
};

// Start it up!
const client = new Client({ email: 'emailhere', password: 'passwordhere' })
  .on('ready', () => console.log('Successfully connected to gateway'))
  .on('messageCreate', message => {
    if (message.content === '!ping') {
      // TODO: pending
    }
  });

// Cache Control!
// Set to 0 to disable caching. Apply to any desired Collection.
client.users.maxSize = 1000;

client.connect();
```

# To Do List

- Framework
  - Clean and powerful commands system
    - Powerful argument handling including validating, parsing and modifications.
    - Easily create custom arguments for your specific needs.
    - Command aliases.
    - Cooldowns and allowed uses before cooldown triggers.
    - Author and bot permission checks in server AND in channel!
  - Clean and powerful inhibitors system
    - Stops a command from running if a requirement fails.
    - Easily add custom inhibitors!
  - Clean and powerful languages system.
    - Built in multi-lingual support.
    - Uses i18next, one of the best localization tools available.
    - Supports nested folders to keep cleaner translation files
- 100% API coverage
- Custom(Redis) cache support
- Proxy WS support
- Proxy REST support
- Step by step guide
- GH Actions
  - Deploy on release
- Readme image/logo??

