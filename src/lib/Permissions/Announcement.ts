import { Bitfield } from '../BitFields/BitField';

export const AnnouncementPermissions = {
  /** Allows you to create and remove announcements. */
  CREATE_ANNOUNCEMENTS: BigInt(1),
  /** Allows you to view announcements */
  VIEW_ANNOUNCEMENTS: BigInt(2),
  /** Allows you to delete announcements made by other users. */
  MANAGE_ANNOUNCEMENTS: BigInt(4),
};

export type AnnouncementPermissionsKeys = keyof typeof AnnouncementPermissions;

export class AnnouncementPermission extends Bitfield {
  /** Checks whether or not the permissions exist in this */
  has(permissions: AnnouncementPermissionsKeys | AnnouncementPermissionsKeys[]) {
    if (!Array.isArray(permissions)) return super.contains(AnnouncementPermissions[permissions]);
    return super.contains(permissions.reduce((a, b) => (a |= AnnouncementPermissions[b]), 0n));
  }

  /** Lists all the toggles and whether or not each is true or false. */
  list() {
    const json = {};
    for (const [key, value] of Object.entries(AnnouncementPermissions)) {
      // @ts-ignore
      json[key] = super.contains(value);
    }

    return json as Record<AnnouncementPermissionsKeys, boolean>;
  }
}
