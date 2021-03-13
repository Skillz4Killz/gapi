import Message from '../../../lib/Message';
import Team from '../../../lib/Team';
import { Command } from '../../Command';
import Inhibitor from '../../Inhibitor';

export default class extends Inhibitor {
  name = 'cooldown';

  async execute(_message: Message, command: Command, team?: Team) {
    // If the command is teamOnly and does not have a team, inhibit the command
    if (command.teamOnly && !team) return true;
    // If the command is dmOnly and there is a team, inhibit the command
    if (command.dmOnly && team) return true;

    // The command should be allowed to run because it meets the requirements
    return false;
  }
}
