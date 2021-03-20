import { Bitfield } from '../BitFields/BitField';

export const ChatPermissions = {
  /** Allows you to send chat messages */
  SEND_MESSAGES: 1n,
  /** Allows you to read chat messages. */
  READ_MESSAGES: 2n,
  /** Allows you to pin messages or delete message from other users. */
  MANAGE_MESSAGES: 3n,
  /** Allows you to create threads in this channel. */
  CREATE_THREADS: 16n,
  /** Allows you to reply to threads in this channel. */
  SEND_THREAD_MESSAGE: 32n,
  /** Allows you to archive and restore threads. */
  MANAGE_THREADS: 64n,
};

export type ChatPermissionsKeys = keyof typeof ChatPermissions;

export class ChatPermission extends Bitfield {
  constructor(bits?: bigint) {
    super();

    if (bits) this.bitfield = bits;
  }

  /** Checks whether or not the permissions exist in this */
  has(permissions: ChatPermissionsKeys | ChatPermissionsKeys[]) {
    if (!Array.isArray(permissions)) return super.contains(ChatPermissions[permissions]);
    return super.contains(permissions.reduce((a, b) => (a |= ChatPermissions[b]), 0n));
  }

  /** Lists all the toggles and whether or not each is true or false. */
  list() {
    const json = {};
    for (const [key, value] of Object.entries(ChatPermissions)) {
      // @ts-ignore
      json[key] = super.contains(value);
    }

    return json as Record<ChatPermissionsKeys, boolean>;
  }
}
