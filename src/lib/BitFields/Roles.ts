import { Bitfield } from './BitField';

export const RoleToggle = {
  isBase: 1n,
  isMentionable: 2n,
  isSelfAssignable: 4n,
  isDisplayedSeparately: 8n,
};

export type RoleToggleKeys = keyof typeof RoleToggle;

export class RoleToggles extends Bitfield {
  /** Checks whether or not the permissions exist in this */
  has(permissions: RoleToggleKeys | RoleToggleKeys[]) {
    if (!Array.isArray(permissions)) return super.contains(RoleToggle[permissions]);

    return super.contains(permissions.reduce((a, b) => (a |= RoleToggle[b]), 0n));
  }

  /** Lists all the toggles for the role and whether or not each is true or false. */
  list() {
    const json = {};
    for (const [key, value] of Object.entries(RoleToggle)) {
      // @ts-ignore
      json[key] = super.contains(value);
    }

    return json as Record<RoleToggleKeys, boolean>;
  }
}
