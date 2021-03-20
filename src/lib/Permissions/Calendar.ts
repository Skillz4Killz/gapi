import { Bitfield } from '../BitFields/BitField';

export const CalendarPermissions = {
  /** Allows you to create events. */
  CREATE_EVENTS: 1n,
  /** Allows you to view events. */
  VIEW_EVENTS: 2n,
  /** Allows you to manage events */
  MANAGE_EVENTS: 4n,
  /** Allows you to remove events created by others. */
  REMOVE_EVENTS: 8n,
  /** Allows you to edit RSVP status for members in an event. */
  EDIT_RSVP: 16n,
};

export type CalendarPermissionsKeys = keyof typeof CalendarPermissions;

export class CalendarPermission extends Bitfield {
  constructor(bits?: bigint) {
    super();

    if (bits) this.bitfield = bits;
  }

  /** Checks whether or not the permissions exist in this */
  has(permissions: CalendarPermissionsKeys | CalendarPermissionsKeys[]) {
    if (!Array.isArray(permissions)) return super.contains(CalendarPermissions[permissions]);
    return super.contains(permissions.reduce((a, b) => (a |= CalendarPermissions[b]), 0n));
  }

  /** Lists all the toggles and whether or not each is true or false. */
  list() {
    const json = {};
    for (const [key, value] of Object.entries(CalendarPermissions)) {
      // @ts-ignore
      json[key] = super.contains(value);
    }

    return json as Record<CalendarPermissionsKeys, boolean>;
  }
}
