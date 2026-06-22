import {useDebouncedValue} from "./use-debounced-value"
import {useEffect, useRef} from "react"

export function useDebouncedSearch(
  query: string,
  setSearchKeyword: (keyword: string) => void,
  clearSearch: () => void,
  delay = 300
) {
  const debouncedQuery = useDebouncedValue(query, delay)
  const hasInteractedRef = useRef(false)
  const prevKeywordRef = useRef("")

  useEffect(() => {
    const keyword = debouncedQuery.trim()

    if (!hasInteractedRef.current) {
      if (!keyword) return
      hasInteractedRef.current = true
    }

    if (!keyword) {
      if (prevKeywordRef.current) {
        prevKeywordRef.current = ""
        clearSearch()
      }
      return
    }

    prevKeywordRef.current = keyword
    setSearchKeyword(keyword)
  }, [debouncedQuery, clearSearch, setSearchKeyword])
}