export function filterUndef<T>(ts: (T | undefined | null)[]): T[] {
  return ts.filter((t: T | undefined | null): t is T => !!t)
}
