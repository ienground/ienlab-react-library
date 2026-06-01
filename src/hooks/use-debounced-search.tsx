import {useDebouncedValue} from "./use-debounced-value"
import {useEffect} from "react"

export function useDebouncedSearch(
  query: string,
  setSearchKeyword: (keyword: string) => void,
  clearSearch: () => void,
  delay = 300
) {
  const debouncedQuery = useDebouncedValue(query, delay)

  useEffect(() => {
    const keyword = debouncedQuery.trim()

    if (!keyword) {
      clearSearch()
      return
    }

    setSearchKeyword(keyword)
  }, [debouncedQuery, clearSearch, setSearchKeyword])
}