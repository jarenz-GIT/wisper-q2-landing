/**
 * Damped spring ease (0→1) tuned for bounce amount.
 * @param {number} [bounce]
 * @returns {(t: number) => number}
 */
export function springOut(bounce = 0.4) {
  const omega = (2 * Math.PI) / (0.28 + bounce * 0.55);
  const zeta = 1 - bounce * 0.72;
  const beta = zeta * omega;

  return (t) => {
    if (t <= 0) return 0;
    if (t >= 1) return 1;

    const envelope = Math.exp(-beta * t);
    const oscillation =
      Math.cos(omega * t) + (beta / omega) * Math.sin(omega * t);

    return 1 - envelope * oscillation;
  };
}
