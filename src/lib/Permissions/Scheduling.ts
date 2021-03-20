import { Bitfield } from '../BitFields/BitField';

export const SchedulingPermissions ={
    /** Allows you to let server know your available schedule */
    CREATE_SCHEDULE: 1n,
    /** Allows you to view server member's schedule */
    VIEW_SCHEDULES: 2n,
    /** Allows you to remove availabilities created by others */
    DELETE_SCHEDULE: 8n,
  }

export type SchedulingPermissionsKeys = keyof typeof SchedulingPermissions;

export class SchedulingPermission extends Bitfield {
  /** Checks whether or not the permissions exist in this */
  has(permissions: SchedulingPermissionsKeys | SchedulingPermissionsKeys[]) {
    if (!Array.isArray(permissions)) return super.contains(SchedulingPermissions[permissions]);
    return super.contains(permissions.reduce((a, b) => (a |= SchedulingPermissions[b]), 0n));
  }

  /** Lists all the toggles and whether or not each is true or false. */
  list() {
    const json = {};
    for (const [key, value] of Object.entries(SchedulingPermissions)) {
      // @ts-ignore
      json[key] = super.contains(value);
    }

    return json as Record<SchedulingPermissionsKeys, boolean>;
  }
}
