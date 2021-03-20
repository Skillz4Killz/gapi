import { Bitfield } from '../BitFields/BitField';

export const DocPermissions ={
    /** Allows you to create docs */
    CREATE_DOCS: 1n,
    /** Allows you to view docs */
    VIEW_DOCS: 2n,
    /** Allows you to update docs created by others or move them to another channel */
    MANAGE_DOCS: 4n,
    /** Allows you to remove docs made by others. */
    REMOVE_DOCS: 8n,
  }

export type DocPermissionsKeys = keyof typeof DocPermissions;

export class DocPermission extends Bitfield {
  /** Checks whether or not the permissions exist in this */
  has(permissions: DocPermissionsKeys | DocPermissionsKeys[]) {
    if (!Array.isArray(permissions)) return super.contains(DocPermissions[permissions]);
    return super.contains(permissions.reduce((a, b) => (a |= DocPermissions[b]), 0n));
  }

  /** Lists all the toggles and whether or not each is true or false. */
  list() {
    const json = {};
    for (const [key, value] of Object.entries(DocPermissions)) {
      // @ts-ignore
      json[key] = super.contains(value);
    }

    return json as Record<DocPermissionsKeys, boolean>;
  }
}
