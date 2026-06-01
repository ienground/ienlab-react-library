import {useEffect} from "react"
import {useLocation, useNavigate} from "react-router"

type Params = {
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
                                         init,
                                         refresh,
                                         onDisposed,
                                       }: Params) {
  const location = useLocation()
  const navigate = useNavigate()

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