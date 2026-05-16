export type PlatformType = "android" | "ios" | "pc"

export function getPlatformType(): PlatformType {
  if (typeof window === "undefined") return "pc"
  const ua = navigator.userAgent
  const platform = navigator.platform

  const isAndroid = /Android/i.test(ua)
  const isIOS =
    /iPhone|iPad|iPod/i.test(ua) ||
    (platform === "MacIntel" && navigator.maxTouchPoints > 1)

  if (isAndroid) return "android"
  if (isIOS) return "ios"
  return "pc"
}