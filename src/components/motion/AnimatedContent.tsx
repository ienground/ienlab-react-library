import { type AnimatedContentProps, slideFadeProps } from "../../props"
import { AnimatePresence, motion } from "motion/react"

const DefaultLoadingFallback = (
  <svg
    className="size-6 animate-spin text-muted-foreground"
    viewBox="0 0 24 24"
    fill="none"
    aria-label="로딩 중"
    role="status"
  >
    <circle
      cx="12"
      cy="12"
      r="9"
      className="opacity-25"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      d="M21 12a9 9 0 0 0-9-9"
      className="opacity-90"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
    />
  </svg>
)

export function AnimatedContent({
                                  status,
                                  className,
                                  children,
                                  loadingFallback = DefaultLoadingFallback,
                                  emptyFallback = "정보 없음",
                                  containerClassName = "flex h-full w-full items-center justify-center",
                                }: AnimatedContentProps) {
  return (
    <AnimatePresence mode="wait">
      {status === "loading" ? (
        <motion.div
          key="loading"
          className={containerClassName}
          {...slideFadeProps}
        >
          {loadingFallback}
        </motion.div>
      ) : status === "empty" ? (
        <motion.div
          key="empty"
          className={containerClassName}
          {...slideFadeProps}
        >
          {emptyFallback}
        </motion.div>
      ) : (
        <motion.div
          key="content"
          className={className}
          {...slideFadeProps}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}