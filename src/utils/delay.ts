/** Delays the execution for some time. */
export function delay(milliseconds = 0) {
  return new Promise(res => setTimeout(res, milliseconds));
}
