import { Bitfield } from '../BitFields/BitField';

export const RecruitmentPermissions = {
  /** Allows you to approve server and game applications */
  APPROVE_APPLICATIONS: 1n,
  /** Allows you to view server and game applications */
  VIEW_APPLICATIONS: 2n,
  /** Allows you to edit server and game applications, and toggle accepting applications */
  EDIT_APPLICATIONS: 4n,
  /** Allows you to indicate interest in a player instead of upvote */
  INDICATE_INTEREST: 16n,
  /** Allows you to modify the find player statys for server listing card */
  MODIFY_STATUS: 32n,
};

export type RecruitmentPermissionsKeys = keyof typeof RecruitmentPermissions;

export class RecruitmentPermission extends Bitfield {
  constructor(bits?: bigint) {
    super();

    if (bits) this.bitfield = bits;
  }

  /** Checks whether or not the permissions exist in this */
  has(permissions: RecruitmentPermissionsKeys | RecruitmentPermissionsKeys[]) {
    if (!Array.isArray(permissions)) return super.contains(RecruitmentPermissions[permissions]);
    return super.contains(permissions.reduce((a, b) => (a |= RecruitmentPermissions[b]), 0n));
  }

  /** Lists all the toggles and whether or not each is true or false. */
  list() {
    const json = {};
    for (const [key, value] of Object.entries(RecruitmentPermissions)) {
      // @ts-ignore
      json[key] = super.contains(value);
    }

    return json as Record<RecruitmentPermissionsKeys, boolean>;
  }
}
