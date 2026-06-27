import type {ReactNode} from "react"

export type AnimatedContentStatus = "loading" | "empty" | "content"

export type AnimatedContentProps = {
  status: AnimatedContentStatus
  className?: string
  children: ReactNode
  loadingFallback?: ReactNode
  emptyFallback?: ReactNode
  containerClassName?: string
}