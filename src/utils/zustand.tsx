import type { StoreApi } from "zustand/vanilla"
import { createContext, type PropsWithChildren, useContext, useState } from "react"
import { useStore } from "zustand/react"

type AutoSelectors<TState extends object> = {
  [K in keyof TState]: () => TState[K]
}

export function createZustandContext<TState extends object, TProps extends object>(
  createLocalStore: (props: TProps) => StoreApi<TState>,
) {
  const StoreContext = createContext<StoreApi<TState> | null>(null)

  function Provider({ children, ...props }: PropsWithChildren<TProps>) {
    const [store] = useState(() => createLocalStore(props as TProps))

    return (
      <StoreContext.Provider value={store}>
        {children}
      </StoreContext.Provider>
    )
  }

  function useBoundStore<T>(selector: (state: TState) => T) {
    const store = useContext(StoreContext)

    if (!store) {
      throw new Error("Provider가 필요합니다.")
    }

    return useStore(store, selector)
  }

  const use = new Proxy({} as AutoSelectors<TState>, {
    get: (_, key: string) => {
      return () => useBoundStore((state) => state[key as keyof TState])
    },
  })

  return {
    Provider,
    useStore: useBoundStore,
    use,
  }
}