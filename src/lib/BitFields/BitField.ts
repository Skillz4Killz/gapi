export class Bitfield {
  bitfield = 0n;

  /** Tests whether or not this bitfield has the permission requested. */
  contains(bits: bigint) {
    return Boolean(this.bitfield & bits);
  }

  /** Adds some bits to the bitfield. */
  add(bits: bigint) {
    this.bitfield |= bits;
    return this;
  }

  /** Removes some bits from the bitfield. */
  remove(bits: bigint) {
    this.bitfield &= ~bits;
    return this;
  }
}
