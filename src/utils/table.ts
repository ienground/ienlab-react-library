export type TreeItem<T> = T & { subRows: TreeItem<T>[] }

export function buildTreeWithSubRows<T, TId>(
  items: T[],
  getId: (item: T) => TId,
  getParentId: (item: T) => TId | null | undefined,
  isRoot?: (item: T) => boolean,
): TreeItem<T>[] {
  const map = new Map<TId, TreeItem<T>>()
  const roots: TreeItem<T>[] = []

  for (const item of items) {
    map.set(getId(item), { ...item, subRows: [] })
  }

  for (const item of items) {
    const node = map.get(getId(item))!
    const parentId = getParentId(item)

    if (isRoot?.(item) || parentId == null || parentId === getId(item)) {
      roots.push(node)
      continue
    }

    const parent = map.get(parentId)
    if (parent) parent.subRows.push(node)
    else roots.push(node)
  }

  return roots
}