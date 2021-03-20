import { Bitfield } from '../BitFields/BitField';

export const BracketPermissions = {
  /** Allows you to report match scores on behalf of your server. */
  REPORT_SCORES: 1n,
  /** Allows you to view the brackets for the tournaments. */
  VIEW_BRACKETS: 2n
}

export type BracketPermissionsKeys = keyof typeof BracketPermissions;

export class BracketPermission extends Bitfield {
  constructor(bits?: bigint) {
    super();
    
    if (bits) this.bitfield = bits;
  }

  /** Checks whether or not the permissions exist in this */
  has(permissions: BracketPermissionsKeys | BracketPermissionsKeys[]) {
    if (!Array.isArray(permissions)) return super.contains(BracketPermissions[permissions]);
    return super.contains(permissions.reduce((a, b) => (a |= BracketPermissions[b]), 0n));
  }

  /** Lists all the toggles and whether or not each is true or false. */
  list() {
    const json = {};
    for (const [key, value] of Object.entries(BracketPermissions)) {
      // @ts-ignore
      json[key] = super.contains(value);
    }

    return json as Record<BracketPermissionsKeys, boolean>;
  }
}
