import { Bitfield } from '../BitFields/BitField';

export const StreamPermissions ={
    /** Allows you to add a stream and also talk in the streams channel */
    ADD_STREAM: 1n,
    /** Allows you to view streams */
    VIEW_STREAMS: 2n,
    /** Allows you to talk in stream channel */
    JOIN_VOICE: 16n,
    /** Allows you to send message in stream channel */
    SEND_MESSAGES: 32n,
  }

export type StreamPermissionsKeys = keyof typeof StreamPermissions;

export class StreamPermission extends Bitfield {
  /** Checks whether or not the permissions exist in this */
  has(permissions: StreamPermissionsKeys | StreamPermissionsKeys[]) {
    if (!Array.isArray(permissions)) return super.contains(StreamPermissions[permissions]);
    return super.contains(permissions.reduce((a, b) => (a |= StreamPermissions[b]), 0n));
  }

  /** Lists all the toggles and whether or not each is true or false. */
  list() {
    const json = {};
    for (const [key, value] of Object.entries(StreamPermissions)) {
      // @ts-ignore
      json[key] = super.contains(value);
    }

    return json as Record<StreamPermissionsKeys, boolean>;
  }
}
