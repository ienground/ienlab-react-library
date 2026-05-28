import * as React from "react"
import {createContext, useContext, useEffect, useMemo, useState} from "react"

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

const initialState: ThemeProviderState = {
  theme: "system",
  resolvedTheme: "light",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

export function ThemeProvider({
                                children,
                                defaultTheme = "system",
                                storageKey = "vite-ui-theme",
                                themeExpiryHours = 24
                              }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = localStorage.getItem(storageKey)

    // 저장된 테마가 있는지 확인
    if (storedTheme) {
      try {
        const parsed = JSON.parse(storedTheme)
        // 유통기한 검사
        if (parsed && typeof parsed === "object" && parsed.theme) {
          const storedTime = parsed.time
          const currentTime = Date.now()
          const expiryTime = themeExpiryHours * 60 * 60 * 1000 // 시간을 밀리초로 변환
          if (currentTime - storedTime < expiryTime) {
            return parsed.theme
          }
        }
      } catch (e) {
        // 하위 호환성: 기존에 JSON 형식이 아닌 일반 문자열("light", "dark", "system")로 저장되어 있던 경우
        if (storedTheme === "light" || storedTheme === "dark" || storedTheme === "system") {
          return storedTheme as Theme
        }
        console.warn("Failed to parse stored theme:", e)
      }
    }
    return defaultTheme
  })

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

    root.classList.remove("light", "dark")
    root.classList.add(resolvedTheme)
  }, [resolvedTheme])

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme: (theme: Theme) => {
        // 테마와 현재 시간을 함께 저장
        const themeData = {
          theme,
          time: Date.now()
        }
        localStorage.setItem(storageKey, JSON.stringify(themeData))
        setTheme(theme)
      },
    }),
    [theme, resolvedTheme, storageKey, themeExpiryHours]
  )

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  return useContext(ThemeProviderContext)
}