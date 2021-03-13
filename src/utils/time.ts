/** This function should be used when you want to convert milliseconds to a human readable format like 1d5h. */
export function humanizeMilliseconds(milliseconds: number) {
  // Gets ms into seconds
  const time = milliseconds / 1000;
  if (time < 1) return '1s';

  const days = Math.floor(time / 86400);
  const hours = Math.floor((time % 86400) / 3600);
  const minutes = Math.floor(((time % 86400) % 3600) / 60);
  const seconds = Math.floor(((time % 86400) % 3600) % 60);

  const dayString = days ? `${days}d ` : '';
  const hourString = hours ? `${hours}h ` : '';
  const minuteString = minutes ? `${minutes}m ` : '';
  const secondString = seconds ? `${seconds}s ` : '';

  return `${dayString}${hourString}${minuteString}${secondString}`;
}
