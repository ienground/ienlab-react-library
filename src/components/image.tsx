import { type ReactElement, useEffect, useState } from "react";
import { AnimatePresence, motion, type HTMLMotionProps } from "motion/react";

interface CrossfadeImageProps extends HTMLMotionProps<"img"> {
  placeholder?: ReactElement;
  src: string;
  onLoadError?: (error: string | Event) => void;
}

export function CrossfadeImage({placeholder, src, onLoadError, ...imgProps}: CrossfadeImageProps) {const [isLoaded, setIsLoaded] = useState(() => {
    if (typeof window === "undefined" || !src) return false;
    const img = new Image();
    img.src = src;
    return img.complete && img.naturalWidth > 0;
  });

  // ✅ 렌더 중 src 변경 감지 — useEffect 없이 상태 리셋
  const [prevSrc, setPrevSrc] = useState(src);
  if (prevSrc !== src) {
    setPrevSrc(src);
    setIsLoaded(false); // 렌더 중 setState → React가 즉시 재렌더, DOM 반영 없이 처리
  }

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.src = src;

    // 콜백 안에서만 setState → ESLint 경고 없음
    img.onload = () => setIsLoaded(true);
    img.onerror = (e) => {
      if (onLoadError) {
        onLoadError(e);
      } else {
        console.error("CrossfadeImage: Failed to load image", src);
      }
    };

    if (img.complete && img.naturalWidth > 0) {
      img.onload(new Event("load"));
    }

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, onLoadError]);

  return (
    <AnimatePresence>
      {isLoaded && src ? (
        <motion.img
          key="loaded-image"
          src={src}
          {...imgProps}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ ...imgProps.style }}
        />
      ) : (
        <motion.div
          key="placeholder"
          initial={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          style={{ ...imgProps.style }}
        >
          {placeholder ?? <div className="w-full h-full bg-sidebar" />}
        </motion.div>
      )}
    </AnimatePresence>
  );
}