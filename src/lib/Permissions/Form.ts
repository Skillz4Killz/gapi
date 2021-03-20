import { Bitfield } from '../BitFields/BitField';

export const FormPermissions ={
    /** Allows you to view all form responses. */
    FORM_RESPONSES: 2n,
    /** Allows you to view all poll results. */
    POLL_RESULTS: 16n,
  }

export type FormPermissionsKeys = keyof typeof FormPermissions;

export class FormPermission extends Bitfield {
  /** Checks whether or not the permissions exist in this */
  has(permissions: FormPermissionsKeys | FormPermissionsKeys[]) {
    if (!Array.isArray(permissions)) return super.contains(FormPermissions[permissions]);
    return super.contains(permissions.reduce((a, b) => (a |= FormPermissions[b]), 0n));
  }

  /** Lists all the toggles and whether or not each is true or false. */
  list() {
    const json = {};
    for (const [key, value] of Object.entries(FormPermissions)) {
      // @ts-ignore
      json[key] = super.contains(value);
    }

    return json as Record<FormPermissionsKeys, boolean>;
  }
}
