export function mapNotNull<T, R>(
  items: T[],
  fn: (item: T, index: number) => R | null | undefined
): R[] {
  return items.flatMap((item, index) => {
    const result = fn(item, index)
    return result != null ? [result] : []
  })
}