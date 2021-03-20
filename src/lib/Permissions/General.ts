import { Bitfield } from '../BitFields/BitField';

export const GeneralPermissions = {
  /** Allows you to update the server */
  UPDATE_SERVER: 4n,
  /** Allows you to directly invite members to the server. */
  INVITE_MEMBERS: 16n,
  /** Allows you to kick or ban members from the server. */
  KICK_BAN_MEMBERS: 32n,
  /** Allows you to create new, edit, or delete channels from the server. */
  MANAGE_CHANNELS: 1024n,
  /** Allows you to create new, edit, or delete webhooks from the server. */
  MANAGE_WEBHOOKS: 2048n,
  /** Allows you to create new, edit, or delete groups from the server. */
  MANAGE_GROUPS: 4096n,
  /** Allows you to use @everyone and @here mentions */
  MENTION_EVERYONE_HERE: 8192n,
  /** Allows you to update the server roles. */
  MANAGE_ROLES: 16384n,
};

export type GeneralPermissionsKeys = keyof typeof GeneralPermissions;

export class GeneralPermission extends Bitfield {
  constructor(bits?: bigint) {
    super();

    if (bits) this.bitfield = bits;
  }

  /** Checks whether or not the permissions exist in this */
  has(permissions: GeneralPermissionsKeys | GeneralPermissionsKeys[]) {
    if (!Array.isArray(permissions)) return super.contains(GeneralPermissions[permissions]);
    return super.contains(permissions.reduce((a, b) => (a |= GeneralPermissions[b]), 0n));
  }

  /** Lists all the toggles and whether or not each is true or false. */
  list() {
    const json = {};
    for (const [key, value] of Object.entries(GeneralPermissions)) {
      // @ts-ignore
      json[key] = super.contains(value);
    }

    return json as Record<GeneralPermissionsKeys, boolean>;
  }
}
