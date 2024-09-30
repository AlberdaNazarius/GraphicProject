export function clamp(value: number): number {
  return Math.min(255, Math.max(0, value));
}