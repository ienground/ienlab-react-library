import { AnimatePresence, motion, type HTMLMotionProps } from "motion/react"
import type { ReactNode } from "react"

type AnimatedSwapIconProps = {
  loading: boolean
  loadingNode: ReactNode
  idleNode: ReactNode
  className?: string
  motionProps?: HTMLMotionProps<"div">
}

const defaultFadeProps: HTMLMotionProps<"div"> = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: { duration: 0.15, ease: "easeOut" },
}

export function AnimatedSwapIcon({
                                   loading,
                                   loadingNode,
                                   idleNode,
                                   className = "w-6 h-6 flex flex-row items-center justify-center",
                                   motionProps,
                                 }: AnimatedSwapIconProps) {
  return (
    <div className={className}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={loading ? "loading" : "idle"}
          {...defaultFadeProps}
          {...motionProps}
        >
          {loading ? loadingNode : idleNode}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}