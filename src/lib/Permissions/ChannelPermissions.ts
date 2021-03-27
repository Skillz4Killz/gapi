import { Bitfield } from '../BitFields/BitField';
import { AnnouncementPermission } from './Announcement';
import { BotPermission } from './Bot';
import { BracketPermission } from './Bracket';
import { CalendarPermission } from './Calendar';
import { ChatPermission } from './Chat';
import { CustomPermission } from './Custom';
import { DocPermission } from './Doc';
import { FormPermission } from './Form';
import { ForumPermission } from './Forum';
import { GeneralPermission } from './General';
import { ListPermission } from './List';
import { MatchmakingPermission } from './Matchmaking';
import { MediaPermission } from './Media';
import { RecruitmentPermission } from './Recruitment';
import { SchedulingPermission } from './Scheduling';
import { StreamPermission } from './Stream';
import { VoicePermission } from './Voice';

export class ChannelPermissions extends Bitfield {
  announcement: AnnouncementPermission;
  bot: BotPermission;
  bracket: BracketPermission;
  calendar: CalendarPermission;
  chat: ChatPermission;
  custom: CustomPermission;
  doc: DocPermission;
  form: FormPermission;
  forum: ForumPermission;
  general: GeneralPermission;
  list: ListPermission;
  matchmaking: MatchmakingPermission;
  media: MediaPermission;
  recruitment: RecruitmentPermission;
  scheduling: SchedulingPermission;
  stream: StreamPermission;
  voice: VoicePermission;

  constructor(bits?: bigint) {
    super();

    if (bits) this.bitfield = bits;
    this.announcement = new AnnouncementPermission();
    this.bot = new BotPermission();
    this.bracket = new BracketPermission();
    this.calendar = new CalendarPermission();
    this.chat = new ChatPermission();
    this.custom = new CustomPermission();
    this.doc = new DocPermission();
    this.form = new FormPermission();
    this.forum = new ForumPermission();
    this.general = new GeneralPermission();
    this.list = new ListPermission();
    this.matchmaking = new MatchmakingPermission();
    this.media = new MediaPermission();
    this.recruitment = new RecruitmentPermission();
    this.scheduling = new SchedulingPermission();
    this.stream = new StreamPermission();
    this.voice = new VoicePermission();
  }

  update(payload: ChannelOverwritePermissions) {
    
  }
}

export interface ChannelOverwritePermissions {
  chat: number;
  docs: number;
  lists: number;
  media: number;
  voice: number;
  forums: number;
  general: number;
  streams: number;
  brackets: number;
  calendar: number;
  scheduling: number;
  announcements: number;
}
