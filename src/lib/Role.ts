import { Client } from '../Client';
import { Base } from './Base';
import { RoleToggle, RoleToggleKeys, RoleToggles } from './BitFields/Roles';
import { AnnouncementPermission } from './Permissions/Announcement';
import { BotPermission } from './Permissions/Bot';
import { BracketPermission } from './Permissions/Bracket';
import { CalendarPermission } from './Permissions/Calendar';
import { ChatPermission } from './Permissions/Chat';
import { CustomPermission } from './Permissions/Custom';
import { DocPermission } from './Permissions/Doc';
import { FormPermission } from './Permissions/Form';
import { ForumPermission } from './Permissions/Forum';
import { GeneralPermission } from './Permissions/General';
import { ListPermission } from './Permissions/List';
import { MatchmakingPermission } from './Permissions/Matchmaking';
import { MediaPermission } from './Permissions/Media';
import { RecruitmentPermission } from './Permissions/Recruitment';
import { SchedulingPermission } from './Permissions/Scheduling';
import { StreamPermission } from './Permissions/Stream';
import { VoicePermission } from './Permissions/Voice';

export class Role extends Base {
  name!: string;
  color!: string;
  priority!: number;
  permissions!: RolePermissions;
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

      if (key === "permissions") {
        this.permissions = {
          announcement: new AnnouncementPermission(value.announcement),
          bot: new BotPermission(value.bot),
          bracket: new BracketPermission(value.bracket),
          calendar: new CalendarPermission(value.calendar),
          chat: new ChatPermission(value.chat),
          custom: new CustomPermission(value.custom),
          doc: new DocPermission(value.doc),
          form: new FormPermission(value.form),
          forum: new ForumPermission(value.forum),
          general: new GeneralPermission(value.general),
          list: new ListPermission(value.list),
          matchmaking: new MatchmakingPermission(value.matchmaking),
          media: new MediaPermission(value.media),
          recruitment: new RecruitmentPermission(value.recruitment),
          scheduling: new SchedulingPermission(value.scheduling),
          stream: new StreamPermission(value.stream),
          voice: new VoicePermission(value.voice),
        }
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

export interface RolePermissions {
  announcement?: AnnouncementPermission;
  bot?: BotPermission;
  bracket?: BracketPermission;
  calendar?: CalendarPermission;
  chat?: ChatPermission;
  custom?: CustomPermission;
  doc?: DocPermission;
  form?: FormPermission;
  forum?: ForumPermission;
  general?: GeneralPermission;
  list?: ListPermission;
  matchmaking?: MatchmakingPermission;
  media?: MediaPermission;
  recruitment?: RecruitmentPermission;
  scheduling?: SchedulingPermission;
  stream?: StreamPermission;
  voice?: VoicePermission
}