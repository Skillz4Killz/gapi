import { baseStructures } from '../base';
import Client from '../Client';

export default class Team extends baseStructures.Base {
  /** The unique hash for this teams banner. */
  hash = '';

  // TODO: fill these
  members = new baseStructures.Collection(this.client);
  groups = new baseStructures.Collection(this.client);

  constructor(client: Client, payload: GuildedTeam) {
    super(client, payload.id);

    this.update(payload);
  }

  /** The url for this teams banner using the default image height and width sizes provided. */
  get avatarURL() {
    return `https://img.guildedcdn.com/TeamAvatar/${this.hash}-Small.png`;
  }

  /** The url for this teams banner using the provided width and height */
  dynamicAvatarURL(
    options: {
      width?: number;
      height?: number;
      type?: 'Small' | 'Medium' | 'Large';
    } = { type: 'Medium' },
  ) {
    if (options.type) return `https://img.guildedcdn.com/TeamAvatar/${this.hash}-${options.type}.png`;

    return `https://s3-us-west-2.amazonaws.com/www.guilded.gg/TeamAvatar/${this.hash}-${
      options.type || 'Medium'
    }.png?w=${options.width || this.client.imageDefaultWidth}&h=${options.height || this.client.imageDefaultHeight}`;
  }

  update(payload: GuildedTeam) {
    // LOOP OVER ALL OPTIONS OBJECT AND ASSIGN THE VALUE TO THE CLIENT
    for (const [key, value] of Object.entries(payload)) {
      if (['homeBannerImageSm', 'homeBannerImageMd', 'homeBannerImageLg'].includes(key)) {
        this.hash = value ? value.substring(value.lastIndexOf('/') + 1, value.lastIndexOf('-')) : undefined;
        continue;
      }

      // TODO: FIX THIS
      // @ts-ignore
      this[key as keyof GuildedTeam] = value;
    }
  }

  /** Edit a members nickname in this team */
  editNickname(userId: string, nickname: string) {
    return this.client.requestManager.editNickname(this.id, userId, nickname);
  }

  /** Fetch the channels for this team */
  fetchChannels(force = false, cache = true) {
    return this.client.requestManager.fetchChannels(this.id, force, cache);
  }

  /** Fetch the groups for this team */
  fetchGroups(cache = true) {
    return this.client.requestManager.fetchGroups(this.id, cache);
  }

  fetchCustomReactions(force = false, cache = true) {
    return this.client.requestManager.fetchCustomReactions(this.id, force, cache);
  }

  /** Add a role to a member */
  addRole(roleId: string, userId: string) {
    return this.client.requestManager.addRole(this.id, roleId, userId);
  }

  removeRole(roleId: string, userId: string) {
    return this.client.requestManager.removeRole(this.id, roleId, userId);
  }
}

// TODO: HANDLE THIS BETTER
export interface GuildedTeam {
  createdAt: string;
  id: string;
  ownerId: string;
  name: string;
  subdomain: string;
  rankNames: undefined;
  profilePicture: string;
  teamDashImage: string;
  status: undefined;
  teamPreferences: undefined;
  additionalGameInfo: {};
  discordGuildId: undefined;
  discordServerName: undefined;
  customizationInfo: {};
  homeBannerImageSm: string;
  homeBannerImageMd: string;
  homeBannerImageLg: string;
  insightsInfo: {};
  alphaInfo: {};
  timezone: string;
  isRecruiting: boolean;
  isVerified: boolean;
  isPublic: boolean;
  alwaysShowTeamHome: boolean;
  isPro: boolean;
  autoSyncDiscordRoles: boolean;
  type: string;
  memberCount: string;
  followerCount: string;
  baseGroup: {
    id: string;
    teamId: string;
    gameId: undefined;
    visibilityTeamRoleId: string;
    membershipTeamRoleId: string;
    isBase: boolean;
    name: string;
    description: undefined;
    additionalGameInfo: {};
    createdBy: undefined;
    createdAt: string;
    updatedBy: undefined;
    updatedAt: undefined;
    deletedAt: undefined;
    priority: undefined;
    customReactionId: undefined;
    isPublic: boolean;
    type: string;
    avatar: undefined;
    banner: undefined;
  };
  membershipRole: string;
  roleIds: string[];
  rolesById: {
    roleId: {
      id: string;
      name: string;
      color: string;
      isBase: boolean;
      teamId: string;
      priority: 4;
      createdAt: string;
      updatedAt: string;
      permissions: {
        chat: 119;
        docs: 15;
        forms: 18;
        lists: 63;
        media: 15;
        voice: 8179;
        forums: 123;
        general: 15412;
        calendar: 31;
        scheduling: 11;
        matchmaking: 1;
        recruitment: 55;
        announcements: 7;
        customization: 49;
      };
      isMentionable: boolean;
      discordRoleId: undefined;
      discordSyncedAt: undefined;
      isSelfAssignable: boolean;
    };
  };
  isFavorite: boolean;
  canInviteMembers: boolean;
  canUpdateTeam: boolean;
  canManageTournaments: boolean;
  viewerIsMember: boolean;
  isAdmin: boolean;
  games: [];
  flair: [
    {
      id: 2;
    },
  ];
  subscriptionInfo: undefined;
}
