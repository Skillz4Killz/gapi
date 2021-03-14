import User from '../lib/User';

export const EMBED_LIMITS = {
  title: 256,
  description: 2048,
  fieldName: 256,
  fieldValue: 1024,
  footerText: 2048,
  authorName: 256,
  fields: 25,
  total: 6000,
};

export class Embed {
  /** The amount of characters in the embed. */
  currentTotal = 0;
  /** Whether the limits should be enforced or not. */
  enforceLimits = true;
  /** If a file is attached to the message it will be added here. */
  file?: EmbedFile;

  color = 0x41ebf4;
  fields: EmbedField[] = [];
  author?: EmbedAuthor;
  description?: string;
  footer?: EmbedFooter;
  image?: EmbedImage;
  timestamp?: string;
  title?: string;
  thumbnail?: EmbedImage;
  url?: string;

  constructor(enforceLimits = true) {
    // By default we will always want to enforce discord limits but this option allows us to bypass for whatever reason.
    if (!enforceLimits) this.enforceLimits = false;

    return this;
  }

  fitData(data: string, max: number) {
    // If the string is bigger then the allowed max shorten it.
    if (data.length > max) data = data.substring(0, max);
    // Check the amount of characters left for this embed
    const availableCharacters = EMBED_LIMITS.total - this.currentTotal;
    // If it is maxed out already return empty string as nothing can be added anymore
    if (!availableCharacters) return ``;
    // If the string breaks the maximum embed limit then shorten it.
    if (this.currentTotal + data.length > EMBED_LIMITS.total) {
      return data.substring(0, availableCharacters);
    }
    // Return the data as is with no changes.
    return data;
  }

  setAuthor(name: string | User, icon?: string, url?: string) {
    // IF A USER WAS PASSED IN
    if (name instanceof User) {
      // IF ICON WAS PROVIDED CHANGE IT TO URL
      if (icon) {
        url = icon;
        icon = undefined;
      }
      // FIRST SET THE AVATAR URL IF ONE IS NOT PROVIDED
      if (!icon) icon = name.avatarURL;
      // OVERWRITE THE NAME WITH THE USER
      name = name.name;
    }

    const finalName = this.enforceLimits ? this.fitData(name, EMBED_LIMITS.authorName) : name;
    // eslint-disable-next-line @typescript-eslint/camelcase
    this.author = { name: finalName, icon_url: icon, url };

    return this;
  }

  setColor(color: string) {
    this.color =
      color.toLowerCase() === `random`
        ? // Random color
          Math.floor(Math.random() * (0xffffff + 1))
        : // Convert the hex to a acceptable color for discord
          parseInt(color.replace('#', ''), 16);

    return this;
  }

  setDescription(description: string | string[]) {
    if (Array.isArray(description)) description = description.join('\n');
    this.description = this.fitData(description, EMBED_LIMITS.description);

    return this;
  }

  addField(name: string, value: string, inline = false) {
    if (this.fields.length >= 25) return this;

    this.fields.push({
      name: this.fitData(name, EMBED_LIMITS.fieldName),
      value: this.fitData(value, EMBED_LIMITS.fieldValue),
      inline,
    });

    return this;
  }

  addBlankField(inline = false) {
    return this.addField('\u200B', '\u200B', inline);
  }

  attachFile(file: unknown, name: string) {
    this.file = {
      blob: file,
      name,
    };
    this.setImage(`attachment://${name}`);

    return this;
  }

  setFooter(text: string, icon?: string) {
    // eslint-disable-next-line @typescript-eslint/camelcase
    this.footer = {
      text: this.fitData(text, EMBED_LIMITS.footerText),
      icon_url: icon,
    };

    return this;
  }

  setImage(url: string) {
    this.image = { url };

    return this;
  }

  setTimestamp(time = Date.now()) {
    this.timestamp = new Date(time).toISOString();

    return this;
  }

  setTitle(title: string, url?: string) {
    this.title = this.fitData(title, EMBED_LIMITS.title);
    if (url) this.url = url;

    return this;
  }

  setThumbnail(url: string) {
    this.thumbnail = { url };

    return this;
  }

  toJSON() {
    return {
      color: this.color,
      fields: this.fields,
      author: this.author,
      description: this.description,
      footer: this.footer,
      image: this.image,
      timestamp: this.timestamp,
      title: this.title,
      thumbnail: this.thumbnail,
      url: this.url,
    };
  }
}

export interface EmbedFile {
  blob: unknown;
  name: string;
}

export interface EmbedAuthor {
  /** The name of the author */
  name?: string;
  /** The url of the author */
  url?: string;
  /** The url of the author icon (supports http(s) and attachments) */
  icon_url?: string;
  /** A proxied url of author icon */
  proxy_icon_url?: string;
}

export interface EmbedField {
  /** The name of the field */
  name: string;
  /** The value of the field */
  value: string;
  /** Whether or not this field should display inline */
  inline?: boolean;
}

export interface EmbedFooter {
  /** The text of the footer */
  text: string;
  /** The url of the footer icon. Only supports http(s) and attachments */
  icon_url?: string;
  /** A proxied url of footer icon */
  proxy_icon_url?: string;
}

export interface EmbedImage {
  /** The source url of image (only supports http(s) and attachments) */
  url?: string;
  /** A proxied url of the image */
  proxy_url?: string;
  /** The height of image */
  height?: number;
  /** The width of the image */
  width?: number;
}
