export type Locale = "ko" | "en"
export type Localized<T, TLocale extends string = Locale> = Record<TLocale, T>