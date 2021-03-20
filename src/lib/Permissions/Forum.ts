import { Bitfield } from '../BitFields/BitField';

export const ForumPermissions ={
    /** Allows you to create forum topics. */
    CREATE_TOPICS: 1n,
    /** Allows you to read forums. */
    READ_FORUMS: 2n,
    /** Allows you to remove topics and replies from others or move to another channel */
    MANAGE_TOPICS: 4n,
    /** Allows you to sticky a topic */
    STICKY_TOPICS: 16n,
    /** Allows you to lock a topic */
    LOCK_TOPICS: 32n,
    /** Allows you to create topic replies */
    CREATE_TOPIC_REPLIES: 64n,
  }

export type ForumPermissionsKeys = keyof typeof ForumPermissions;

export class ForumPermission extends Bitfield {
  /** Checks whether or not the permissions exist in this */
  has(permissions: ForumPermissionsKeys | ForumPermissionsKeys[]) {
    if (!Array.isArray(permissions)) return super.contains(ForumPermissions[permissions]);
    return super.contains(permissions.reduce((a, b) => (a |= ForumPermissions[b]), 0n));
  }

  /** Lists all the toggles and whether or not each is true or false. */
  list() {
    const json = {};
    for (const [key, value] of Object.entries(ForumPermissions)) {
      // @ts-ignore
      json[key] = super.contains(value);
    }

    return json as Record<ForumPermissionsKeys, boolean>;
  }
}
