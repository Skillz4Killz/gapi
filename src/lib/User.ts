import Client from '../Client';
import Base from './Base';

export default class User extends Base {
  /** The unique hash for this users avatar. */
  avatarHash = '';
  /** The unique hash for this users banner. */
  bannerHash = '';
  /** The name of the user */
  name = '';
  /** The timestamp when this user joined guilded. */
  joinedAt = 0;

  steamId!: string;
  userStatus = {
    content: '',
    customReactionId: '',
  };
  subdomain!: string;
  moderationStatus!: string;
  aboutInfo!: string;
  lastOnline!: string;
  aliases!: UserAlias[];
  email!: string;
  serviceEmail!: string;

  constructor(client: Client, payload: GuildedUser) {
    super(client, payload.id);

    this.update(payload);
  }

  /** The Date object for when this user was created. */
  get joinDate() {
    return new Date(this.joinedAt);
  }

  /** The Date in ISO string for when this user was created */
  get joinDateISO() {
    return new Date(this.joinedAt).toISOString();
  }

  /** The mention for this user */
  get mention() {
    return `@${this.name}`;
  }

  /** The url for this user's avatar using the default image height and width sizes provided. */
  get avatarURL() {
    return `https://img.guildedcdn.com/UserAvatar/${this.avatarHash}-Small.png`;
  }

  /** The url for this user's avatar using the provided width and height */
  dynamicAvatarURL(
    options: {
      width?: number;
      height?: number;
      type?: 'Small' | 'Medium' | 'Large';
    } = {
      type: 'Medium',
    },
  ) {
    if (options.type) return `https://img.guildedcdn.com/UserAvatar/${this.avatarHash}-${options.type}.png`;
    return `https://s3-us-west-2.amazonaws.com/www.guilded.gg/UserAvatar/${this.avatarHash}-${
      options.type || 'Medium'
    }.png?w=${options.width || this.client.imageDefaultWidth}&h=${options.height || this.client.imageDefaultHeight}`;
  }

  /** The url for this user's banner using the default image height and width sizes provided. */
  get bannerURL() {
    return `https://img.guildedcdn.com/UserBanner/${this.bannerHash}-Small.png`;
  }

  /** The url for this user's banner using the provided width and height */
  dynamicBannerURL(
    options: {
      width?: number;
      height?: number;
      type?: 'Small' | 'Medium' | 'Large';
    } = {
      type: 'Medium',
    },
  ) {
    if (options.type) return `https://img.guildedcdn.com/UserBanner/${this.bannerHash}-${options.type}.png`;
    return `https://s3-us-west-2.amazonaws.com/www.guilded.gg/UserBanner/${this.bannerHash}-${
      options.type || 'Medium'
    }.png?w=${options.width || this.client.imageDefaultWidth}&h=${options.height || this.client.imageDefaultHeight}`;
  }

  update(payload: GuildedUser) {
    // LOOP OVER ALL OPTIONS OBJECT AND ASSIGN THE VALUE TO THE CLIENT
    for (const [key, value] of Object.entries(payload)) {
      if (
        [
          'profilePictureSm',
          'profilePicture',
          'profilePictureLg',
          'profilePictureBlur',
          'profileBannerBlur',
          'profileBannerLg',
          'profileBannerSm',
        ].includes(key)
      ) {
        this.avatarHash = value ? value.substring(value.lastIndexOf('/') + 1, value.lastIndexOf('-')) : undefined;
        continue;
      }

      if (key === 'joinDate') {
        this.joinedAt = Date.parse(value);
        continue;
      }

      // TODO: FIX THIS
      // @ts-ignore
      this[key as keyof GuildedUser] = value;
    }
  }
}

export interface GuildedUser {
  id: string;
  name: string;
  profilePictureSm: string;
  profilePicture: string;
  profilePictureLg: string;
  profilePictureBlur: string;
  profileBannerBlur: string;
  profileBannerLg: string;
  profileBannerSm: string;
  joinDate: string;
  steamId: string;
  userStatus: {
    content: string;
    customReactionId: string;
  };
  subdomain: string;
  moderationStatus: string;
  aboutInfo: UserAboutInfo;
  lastOnline: string;
  aliases: UserAlias[];
  email: string;
  serviceEmail: string;
}

export interface UserAlias {
  alias?: string;
  discriminator: null | string;
  name: string;
  createdAt?: string;
  userId?: string;
  gameId: number;
  socialLinkSource: SocialLinkSources | null;
  additionalInfo: unknown;
  editedAt?: string;
  playerInfo: unknown;
}

export type SocialLinkSources =
  | 'bnet'
  | 'discord'
  | 'psn'
  | 'steam'
  | 'switch'
  | 'twitch'
  | 'twitter'
  | 'xbox'
  | 'youtube';

export interface UserAboutInfo {
    bio?: string;
    tagLine?: string;
}