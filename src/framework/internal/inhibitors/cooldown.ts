import Message from '../../../lib/Message';
import Team from '../../../lib/Team';
import { humanizeMilliseconds } from '../../../utils/time';
import { Command } from '../../Command';
import Inhibitor from '../../Inhibitor';

export interface Cooldown {
  used: number;
  timestamp: number;
}

export default class extends Inhibitor {
  name = 'cooldown';
  membersInCooldown = new Map<string, Cooldown>();

  async execute(message: Message, command: Command) {
    if (!command.cooldown) return false;

    const key = `${message.authorId}-${command.name}`;
    const cooldown = this.membersInCooldown.get(key);
    if (cooldown) {
      if (cooldown.used >= (command.cooldown.allowedUses || 1)) {
        const now = Date.now();
        if (cooldown.timestamp > now) {
          message.send(
            `You must wait **${humanizeMilliseconds(cooldown.timestamp - now)}** before using this command again.`,
          );
          return true;
        } else {
          cooldown.used = 0;
        }
      }

      this.membersInCooldown.set(key, {
        used: cooldown.used + 1,
        timestamp: Date.now() + command.cooldown.seconds * 1000,
      });
      return false;
    }

    this.membersInCooldown.set(key, {
      used: 1,
      timestamp: Date.now() + command.cooldown.seconds * 1000,
    });
    return false;
  }
}
