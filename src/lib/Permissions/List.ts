import { Bitfield } from '../BitFields/BitField';

export const ListPermissions ={
    /** Allows you to create list items */
    CREATE_LIST_ITEM: 1n,
    /** Allows you to view list items */
    VIEW_LIST_ITEMS: 2n,
    /** Allows you to edi list item messages by others and move them to other channels. */
    MANAGE_LIST_ITEMS: 4n,
    /** Allows you to remove list items created by others */
    REMOVE_LIST_ITEMS: 8n,
    /** Allows you to complete list items created by others */
    COMPLETE_LIST_ITEMS: 16n,
    /** Allows you to reorder list items */
    REORDER_LIST_ITEMS: 32n,
  }

export type ListPermissionsKeys = keyof typeof ListPermissions;

export class ListPermission extends Bitfield {
  /** Checks whether or not the permissions exist in this */
  has(permissions: ListPermissionsKeys | ListPermissionsKeys[]) {
    if (!Array.isArray(permissions)) return super.contains(ListPermissions[permissions]);
    return super.contains(permissions.reduce((a, b) => (a |= ListPermissions[b]), 0n));
  }

  /** Lists all the toggles and whether or not each is true or false. */
  list() {
    const json = {};
    for (const [key, value] of Object.entries(ListPermissions)) {
      // @ts-ignore
      json[key] = super.contains(value);
    }

    return json as Record<ListPermissionsKeys, boolean>;
  }
}
