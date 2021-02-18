# gapi

A TypeScript NodeJS API Wrapper for Guilded.gg API.

# Design Goals

- Best Scalability!
- Best developer experience!
- Extremely flexible/dynamic!

# Usage

## Beginner/Basic

```ts
import { Client } from 'gapi';

const client = new Client({ email: 'emailhere', password: 'passwordhere' })
  .on('ready', () => console.log('Successfully connected to gateway'))
  .on('messageCreate', message => {
    if (message.content === '!ping') {
      // TODO: pending
    }
  })
  .connect();
```

## Advanced

```ts
import { Client, baseStructures, structures } from 'gapi';

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
  - Clean and powerful events system
    - Event listeners that are ran when an event occurs.
    - Easily reloadable!
    - Useful events available to help debug!
  - Clean and powerful inhibitors system
    - Stops a command from running if a requirement fails.
    - Easily add custom inhibitors!
  - Clean and powerful monitors system.
    - Runs a function on every message sent. Useful for stuff like auto-moderation or tags.
    - Easily ignore bots, users, edits, dms.
    - Powerful permission checks.
  - Clean and powerful tasks system.
    - Runs a function at a certain interval. Useful for things like unmute and updating bot lists etc.
    - Can be used for cache sweeping to keep your cache optimized for exactly what you want.
    - Botlists code already made for most botlists. Just add your api tokens for each site and magic!
  - Clean and powerful languages system.
    - Built in multi-lingual support.
    - Uses i18next, one of the best localization tools available.
    - Supports nested folders to keep cleaner translation files
- 100% API coverage
- Redis cache
- Proxy WS support
- Proxy rest support
- Step by step guide
- GH Actions
  - Linter
  - Prettier
  - TSC
  - Deploy on release
