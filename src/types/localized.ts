export const SUPPORTED_LOCALES = ["ko", "en"] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]
export type Localized<T, TLocale extends string = Locale> = Record<TLocale, T>
