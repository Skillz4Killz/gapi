import { Bitfield } from '../BitFields/BitField';

export const MatchmakingPermissions ={
    /** Allows you to create matchmaking scrims */
    CREATE_SCRIMS: 1n,
    /** Allows you to use the server to create and manage tournaments */
    REGISTER_FOR_TOURNAMENTS: 4n,
    /** Allows you to register the server for tournaments */
    CREATE_TOURNAMENTS: 16n,
  }

export type MatchmakingPermissionsKeys = keyof typeof MatchmakingPermissions;

export class MatchmakingPermission extends Bitfield {
  /** Checks whether or not the permissions exist in this */
  has(permissions: MatchmakingPermissionsKeys | MatchmakingPermissionsKeys[]) {
    if (!Array.isArray(permissions)) return super.contains(MatchmakingPermissions[permissions]);
    return super.contains(permissions.reduce((a, b) => (a |= MatchmakingPermissions[b]), 0n));
  }

  /** Lists all the toggles and whether or not each is true or false. */
  list() {
    const json = {};
    for (const [key, value] of Object.entries(MatchmakingPermissions)) {
      // @ts-ignore
      json[key] = super.contains(value);
    }

    return json as Record<MatchmakingPermissionsKeys, boolean>;
  }
}
