import {type ReactElement, useEffect, useState} from "react";
import {AnimatePresence, motion, type HTMLMotionProps} from "motion/react";


interface CrossfadeImageProps extends HTMLMotionProps<'img'> {
  placeholder?: ReactElement;
}

export function CrossfadeImage({placeholder, src, ...imgProps}: CrossfadeImageProps) {
  // src가 없으면 로드되었다고 간주하거나, 필요에 따라 오류 처리를 할 수 있습니다.
  const [isLoaded, setIsLoaded] = useState(false);

  // // 1. 이미지 로딩 감지 로직
  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.src = src;

    // 이미 캐시된 경우(즉시 완료)를 대비하여 로드 상태를 체크합니다.
    if (img.complete) {
      setIsLoaded(true);
    } else {
      // 이미지가 로드될 때 상태 업데이트
      img.onload = () => setIsLoaded(true);
      img.onerror = () => {
        // 로드 실패 시에는 isLoaded를 true로 설정하지 않아 플레이스홀더를 유지합니다.
        console.error("CrossfadeImage: Failed to load image", src);
      };
    }
  }, [src]);

  return (
    <AnimatePresence>
      {isLoaded && src ? (
        <motion.img
          key="loaded-image"
          src={src}
          {...imgProps}

          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          style={{
            ...imgProps.style,
          }}
        />
      ) : (
        <motion.div
          key="placeholder"
          initial={{opacity: 1}}
          transition={{duration: 0.3}}
          style={{
            ...imgProps.style,
          }}
        >
          {
            placeholder ? placeholder : <div className="w-full h-full bg-sidebar"/>
          }
        </motion.div>
      )}
    </AnimatePresence>
  );
}