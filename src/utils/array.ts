// src/utils/array.ts
declare global {
  interface Array<T> {
    mapNotNull<R>(fn: (item: T, index: number) => R | null | undefined): R[]
  }
}

Array.prototype.mapNotNull = function <T, R>(
  this: T[],
  fn: (item: T, index: number) => R | null | undefined
): R[] {
  return this.flatMap((item, index) => {
    const result = fn(item, index)
    return result != null ? [result] : []
  })
}