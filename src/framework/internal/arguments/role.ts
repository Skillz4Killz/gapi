import { Message } from '../../../..';
import { Argument } from '../../Argument';

export default class extends Argument {
  name = 'role';

  async execute(parameters: string[], message: Message) {
    const [id] = parameters;
    if (!id || !message.team) return;

    const roleID = id.startsWith('<@&') ? id.substring(3, id.length - 1) : id;
    const name = id.toLowerCase();
    const roles = message.team.roles;

    const role = roles.get(roleID) || roles.find(r => r.name.toLowerCase() === name);
    if (role) return role;

    // No role was found, let's list roles for better user experience.
    const possibleRoles = roles.filter(r => r.name.toLowerCase().startsWith(name));
    if (!possibleRoles) return;

    message.send(
      [
        `A valid role was not found using the name **${id}**.`,
        'A few possible roles that you may wish to use were found. Listed below are the role names and ids. Try using the id of the role you wish to use.',
        '',
        possibleRoles.map(r => `**${r.name}** ${r.id}`).join('\n'),
      ].join('\n'),
    );

    return;
  }
}
