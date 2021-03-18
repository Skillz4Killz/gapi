import { Client } from '../Client';
import { Collection } from '../utils/Collection';
import { Base } from './Base';

export class Member extends Base {
  name!: string;
  nickname?: string;
  badges?: unknown;
  joinedAt!: number;
  membershipRole!: string;
  lastOnlineAt!: number;
  roleIds!: number[];
  socialLinks!: SocialLinks;
  aliases!: unknown[];
  userPresenceStatus!: number;
  teamXp!: number;
  stonks!: number;
  teamId: string;

  // TODO: better payload type
  constructor(client: Client, payload: any, teamId: string) {
    super(client, payload.id);

    this.teamId = teamId;
    this.update(payload);
  }

  // TODO: better type
  update(payload: any) {
    // LOOP OVER ALL OPTIONS OBJECT AND ASSIGN THE VALUE TO THE CLIENT
    for (const [key, value] of Object.entries(payload)) {
      // SKIP THESE RELATED TO USER
      if (['profilePicture', 'profileBannerBlur', 'userStatus', 'socialLinks', 'userPresenceStatus'].includes(key))
        continue;

      if (key === 'joinDate') {
        this.joinedAt = Date.parse(value as string);
        continue;
      }

      if (key === 'lastOnline') {
        this.lastOnlineAt = Date.parse(value as string);
        continue;
      }

      // TODO: FIX THIS
      // @ts-ignore
      this[key] = value;
    }

    // TODO: NOW WE USE THIS TO ALSO UPDATE THE USER CACHE
  }

  get user() {
    return this.client.users.get(this.id)!;
  }

  get team() {
    return this.client.teams.get(this.teamId);
  }

  /** The roles this member has on this team. */
  get roles() {
    const team = this.team;
    if (!team) return new Collection(this.client);

    return this.roleIds.map(id => team.roles.get(id.toString())!).filter(r => r);
  }
}

export interface SocialLinks {
  type: 'patreon' | 'twitter';
  handle: string;
  additionalInfo: {};
}
