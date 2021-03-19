import { Message } from '../../../..';
import { Argument } from '../../Argument';

export default class extends Argument {
  name = 'member';

  async execute(parameters: string[], message: Message) {
    const [id] = parameters;
    if (!id) return;

    const userID = id.startsWith('<@') ? id.substring(id.startsWith('<@!') ? 3 : 2, id.length - 1) : id;

    const cachedMember = message.team?.members.get(userID);
    if (cachedMember) return cachedMember;

    // TODO: FETCH AND RETURN MEMBER
    return;
  }
}
