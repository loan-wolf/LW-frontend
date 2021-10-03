import React, { useState, useMemo, useCallback } from 'react'
import { noop } from 'lodash/fp'
import { ThemesEnum, THEME_DEFAULT } from 'modules/themes/constants'
import { getThemeColors } from 'modules/themes/themeVars'
import {
  getLSTheme,
  setLSTheme,
  loadThemeColors,
} from 'modules/themes/loadTheme'

type ThemeContextValue = {
  colors: ReturnType<typeof getThemeColors>
  currentTheme: ThemesEnum
  setTheme: (theme: ThemesEnum) => void
}

export const ThemeContext = React.createContext<ThemeContextValue>({
  colors: getThemeColors(THEME_DEFAULT),
  currentTheme: THEME_DEFAULT,
  setTheme: noop,
})

type Props = {
  children?: React.ReactNode
}

export function ThemeProvider({ children }: Props) {
  const [currentTheme, setThemeValue] = useState<ThemesEnum>(
    useMemo(() => getLSTheme(), []),
  )

  const setTheme = useCallback((theme: ThemesEnum) => {
    loadThemeColors(theme)
    setLSTheme(theme)
    setThemeValue(theme)
  }, [])

  const colors = useMemo(() => getThemeColors(currentTheme), [currentTheme])

  return (
    <ThemeContext.Provider value={{ colors, currentTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
