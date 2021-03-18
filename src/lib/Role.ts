import { Client } from '../Client';
import { Base } from './Base';
import { RoleToggle, RoleToggleKeys, RoleToggles } from './BitFields/Roles';

export class Role extends Base {
  name!: string;
  color!: string;
  priority!: number;
  permissions!: unknown[];
  teamId!: string;
  createdAt!: number;
  updatedAt!: number;
  discordRoleId: null;
  discordSyncedAt: null;
  toggles: RoleToggles;

  constructor(client: Client, payload: RolePayload) {
    super(client, payload.id.toString());

    this.toggles = new RoleToggles();
    this.update(payload);
  }

  update(payload: RolePayload) {
    // LOOP OVER ALL OPTIONS OBJECT AND ASSIGN THE VALUE TO THE CLIENT
    for (const [key, value] of Object.entries(payload)) {
      if (['createdAt', 'updatedAt'].includes(key)) {
        // @ts-ignore
        this[key] = Date.parse(value);
        continue;
      }

      // BOOLEANS BECOME BITFIELDS
      const bits = RoleToggle[key as RoleToggleKeys];
      if (bits) {
        if (value) this.toggles.add(bits);
        else this.toggles.remove(bits);
        continue;
      }

      // TODO: FIX THIS
      // @ts-ignore
      this[key] = value;
    }
  }

  get isBase() {
    return this.toggles.contains(RoleToggle.isBase);
  }

  get isMentionable() {
    return this.toggles.contains(RoleToggle.isMentionable);
  }

  get isSelfAssignable() {
    return this.toggles.contains(RoleToggle.isSelfAssignable);
  }

  get isDisplayedSeparately() {
    return this.toggles.contains(RoleToggle.isDisplayedSeparately);
  }
}

export interface RolePayload {
  id: number;
  name: string;
  color: string;
  priority: number;
  permissions: unknown[];
  isBase: boolean;
  teamId: string;
  createdAt: string;
  updatedAt: string;
  isMentionable: boolean;
  discordRoleId: null;
  discordSyncedAt: null;
  isSelfAssignable: boolean;
  isDisplayedSeparately: boolean;
}
