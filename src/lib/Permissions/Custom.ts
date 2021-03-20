import { Bitfield } from '../BitFields/BitField';

export const CustomPermissions ={
    /** Allows you to create/manage the custom server emojis. */
    MANAGE_EMOJIS: 1n,
    /** Allows you to change your own nickname. */
    CHANGE_NICKNAME: 16n,
    /** Allows you to change the nickname of others. */
    MANAGE_NICKNAME: 32n,
  }

export type CustomPermissionsKeys = keyof typeof CustomPermissions;

export class CustomPermission extends Bitfield {
  /** Checks whether or not the permissions exist in this */
  has(permissions: CustomPermissionsKeys | CustomPermissionsKeys[]) {
    if (!Array.isArray(permissions)) return super.contains(CustomPermissions[permissions]);
    return super.contains(permissions.reduce((a, b) => (a |= CustomPermissions[b]), 0n));
  }

  /** Lists all the toggles and whether or not each is true or false. */
  list() {
    const json = {};
    for (const [key, value] of Object.entries(CustomPermissions)) {
      // @ts-ignore
      json[key] = super.contains(value);
    }

    return json as Record<CustomPermissionsKeys, boolean>;
  }
}
