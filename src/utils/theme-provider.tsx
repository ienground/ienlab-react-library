import * as React from "react"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

type Theme = "dark" | "light" | "system"
type ResolvedTheme = "dark" | "light"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
  themeExpiryHours?: number
}

type ThemeProviderState = {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
}

type StoredThemeData = {
  theme: Theme
  time: number
}

const initialState: ThemeProviderState = {
  theme: "system",
  resolvedTheme: "light",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

const isTheme = (value: unknown): value is Theme => {
  return value === "light" || value === "dark" || value === "system"
}

const readStoredTheme = (
  storageKey: string,
  defaultTheme: Theme,
  themeExpiryHours: number
): Theme => {
  const storedTheme = localStorage.getItem(storageKey)
  if (!storedTheme) return defaultTheme

  try {
    const parsed: unknown = JSON.parse(storedTheme)

    if (isTheme(parsed)) {
      return parsed
    }

    if (
      parsed &&
      typeof parsed === "object" &&
      "theme" in parsed &&
      "time" in parsed
    ) {
      const data = parsed as StoredThemeData

      if (!isTheme(data.theme)) {
        return defaultTheme
      }

      if (typeof data.time !== "number") {
        return defaultTheme
      }

      const currentTime = Date.now()
      const expiryTime = themeExpiryHours * 60 * 60 * 1000

      if (currentTime - data.time < expiryTime) {
        return data.theme
      }

      localStorage.removeItem(storageKey)
      return defaultTheme
    }
  } catch {
    if (isTheme(storedTheme)) {
      return storedTheme
    }
  }

  return defaultTheme
}

export function ThemeProvider({
                                children,
                                defaultTheme = "system",
                                storageKey = "vite-ui-theme",
                                themeExpiryHours = 24,
                              }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() =>
    readStoredTheme(storageKey, defaultTheme, themeExpiryHours)
  )

  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  )

  const resolvedTheme: ResolvedTheme =
    theme === "system" ? systemTheme : theme

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    const handleChange = (event: MediaQueryListEvent) => {
      setSystemTheme(event.matches ? "dark" : "light")
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    const root = window.document.documentElement
    const safeTheme: ResolvedTheme = resolvedTheme === "dark" ? "dark" : "light"

    root.classList.remove("light", "dark")
    root.classList.add(safeTheme)
  }, [resolvedTheme])

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme: (nextTheme: Theme) => {
        const themeData: StoredThemeData = {
          theme: nextTheme,
          time: Date.now(),
        }

        localStorage.setItem(storageKey, JSON.stringify(themeData))
        setThemeState(nextTheme)
      },
    }),
    [theme, resolvedTheme, storageKey]
  )

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeProviderContext)