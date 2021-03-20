import { Task } from '../../Task';

// const MESSAGE_LIFETIME = 60000 * 10;
// const MEMBER_LIFETIME = 60000 * 30;

export default class extends Task {
  name = 'sweeper';
  // Every 5 minutes
  intervalMilliseconds = 60000 * 5;

  async execute() {
    if (!this.client.ready) return;

    // TODO: remove outdated members/messages
  }
}
