import { useEffect } from "react"

type Params = {
  location: {
    key?: string
    pathname: string
    state?: unknown
  }
  navigate: (to: string, options?: { replace?: boolean; state?: unknown }) => void
  init: () => void
  refresh: () => void
  onDisposed: () => void
}

function shouldRefreshFromState(state: unknown): boolean {
  return (
    typeof state === "object" &&
    state !== null &&
    "shouldRefresh" in state &&
    Boolean((state as { shouldRefresh?: boolean }).shouldRefresh)
  )
}

export function useListScreenLifecycle({
                                         location,
                                         navigate,
                                         init,
                                         refresh,
                                         onDisposed,
                                       }: Params) {
  useEffect(() => {
    if (shouldRefreshFromState(location.state)) {
      refresh()
      navigate(location.pathname, { replace: true, state: {} })
      return
    }

    init()
  }, [location.key, location.pathname, location.state, navigate, init, refresh])

  useEffect(() => {
    return () => onDisposed()
  }, [onDisposed])
}