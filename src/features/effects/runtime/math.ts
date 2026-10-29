export function clamp(v: number, a: number, b: number): number {
  return v < a ? a : v > b ? b : v;
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Map scrollY into 0…1 across [start, end]. */
export function progress(y: number, start: number, end: number): number {
  const span = end - start;
  if (span <= 0) return y >= end ? 1 : 0;
  return clamp((y - start) / span, 0, 1);
}

export function pad2(n: number): string {
  return (n < 9 ? '0' : '') + (n + 1);
}
