import { Bitfield } from '../BitFields/BitField';

export const BotPermissions = {
    /** Allows you to create and edit bots using the automated workflow. */
    MANAGE_BOTS: 1n
}

export type BotPermissionsKeys = keyof typeof BotPermissions;

export class BotPermission extends Bitfield {
  constructor(bits?: bigint) {
    super();

    if (bits) this.bitfield = bits;
  }

  /** Checks whether or not the permissions exist in this */
  has(permissions: BotPermissionsKeys | BotPermissionsKeys[]) {
    if (!Array.isArray(permissions)) return super.contains(BotPermissions[permissions]);
    return super.contains(permissions.reduce((a, b) => (a |= BotPermissions[b]), 0n));
  }

  /** Lists all the toggles and whether or not each is true or false. */
  list() {
    const json = {};
    for (const [key, value] of Object.entries(BotPermissions)) {
      // @ts-ignore
      json[key] = super.contains(value);
    }

    return json as Record<BotPermissionsKeys, boolean>;
  }
}
