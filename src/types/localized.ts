export const SUPPORTED_LOCALES = ["ko", "en"] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]
export type Localized<T, TLocale extends string = Locale> = Record<TLocale, T>

let localeResolver: (() => string | undefined) | null = null

export function setLocalizedLocaleResolver(resolver: () => string | undefined) {
  localeResolver = resolver
}

export const Localized = {
  get<T>(value: Localized<T>, fallback: Locale = "ko"): T {
    const resolved = localeResolver?.()
    const locale = SUPPORTED_LOCALES.includes(resolved as Locale)
      ? (resolved as Locale)
      : fallback

    return value[locale] ?? value[fallback]
  },

  ko<T>(value: Localized<T>): T {
    return value.ko
  },
}