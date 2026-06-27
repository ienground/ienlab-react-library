import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"

interface ScrollDownIndicatorProps {
  offset?: number
}

// 스크롤 바닥 감지 훅을 동일 파일에 내장하여 이식성을 향상
function useScrollToBottom({ offset = 80 }: { offset?: number } = {}) {
  const [isAtBottom, setIsAtBottom] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      
      if (documentHeight - scrollPosition < offset) {
        setIsAtBottom(true)
      } else {
        setIsAtBottom(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [offset])

  return isAtBottom
}

export function ScrollDownIndicator({ offset = 80 }: ScrollDownIndicatorProps) {
  const isAtBottom = useScrollToBottom({ offset })
  const showScrollIndicator = !isAtBottom

  return (
    <AnimatePresence>
      {showScrollIndicator && (
        <motion.div
          initial={{ opacity: 0, y: 10, x: "-50%" }}
          animate={{ opacity: 1, y: 0, x: "-50%" }}
          exit={{ opacity: 0, y: 10, x: "-50%" }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-10 left-1/2 z-50 flex flex-col items-center pointer-events-none"
        >
          <div className="flex flex-col items-center gap-y-1">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.5,
                ease: "easeInOut"
              }}
              className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1.5 mt-1 bg-background/50 backdrop-blur-sm"
            >
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut"
                }}
                className="w-1 h-2 bg-muted-foreground rounded-full"
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
