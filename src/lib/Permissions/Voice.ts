import { Bitfield } from '../BitFields/BitField';

export const VoicePermissions = {
  /** Allows you to talk in voice chat */
  ADD_VOICE: 1n,
  /** Allows you to listen to voice chat */
  HEAR_VOICE: 2n,
  /** Allows you to move members to other voice rooms */
  MOVE_MEMBERS: 16n,
  /** Allows you to prioritize your voice when speaking in voice chat */
  PRIORITY_SPEAKER: 32n,
  /** Allows you to use voice activity input mode from voice chats */
  VOICE_ACTIVITY: 64n,
  /** Allows you to mute members in voice chats */
  MUTE_MEMBER: 128n,
  /** Allows you to deafen members in voice chats */
  DEAFEN_MEMBERS: 256n,
  /** Allows you to create, rename, and delete voice rooms */
  MANAGE_VOICE_ROOMS: 512n,
  /** Allows you to broadcast your voice to lower in hierarchy when speaking in voice channels */
  BROADCAST: 1024n,
  /** Allows you to direct your voice to specific users */
  WHISPER: 2048n,
  /** Allows you to send chat messages in the voice channel */
  SEND_MESSAGE: 4096n,
};

export type VoicePermissionsKeys = keyof typeof VoicePermissions;

export class VoicePermission extends Bitfield {
  constructor(bits?: bigint) {
    super();

    if (bits) this.bitfield = bits;
  }

  /** Checks whether or not the permissions exist in this */
  has(permissions: VoicePermissionsKeys | VoicePermissionsKeys[]) {
    if (!Array.isArray(permissions)) return super.contains(VoicePermissions[permissions]);
    return super.contains(permissions.reduce((a, b) => (a |= VoicePermissions[b]), 0n));
  }

  /** Lists all the toggles and whether or not each is true or false. */
  list() {
    const json = {};
    for (const [key, value] of Object.entries(VoicePermissions)) {
      // @ts-ignore
      json[key] = super.contains(value);
    }

    return json as Record<VoicePermissionsKeys, boolean>;
  }
}
