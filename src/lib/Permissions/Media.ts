import { Bitfield } from '../BitFields/BitField';

export const MediaPermissions ={
    /** Allows you to create media */
    CREATE_MEDIA: 1n,
    /** Allows you to see media */
    SEE_MEDIA: 2n,
    /** Allows you to edit media created by others and move to another channel */
    MANAGE_MEDIA: 4n,
    /** Allows you to remove media created by others */
    REMOVE_MEDIA: 8n,
  }

export type MediaPermissionsKeys = keyof typeof MediaPermissions;

export class MediaPermission extends Bitfield {
  /** Checks whether or not the permissions exist in this */
  has(permissions: MediaPermissionsKeys | MediaPermissionsKeys[]) {
    if (!Array.isArray(permissions)) return super.contains(MediaPermissions[permissions]);
    return super.contains(permissions.reduce((a, b) => (a |= MediaPermissions[b]), 0n));
  }

  /** Lists all the toggles and whether or not each is true or false. */
  list() {
    const json = {};
    for (const [key, value] of Object.entries(MediaPermissions)) {
      // @ts-ignore
      json[key] = super.contains(value);
    }

    return json as Record<MediaPermissionsKeys, boolean>;
  }
}
