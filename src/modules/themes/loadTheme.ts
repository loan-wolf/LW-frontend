import { flow, forEach, toPairs } from 'lodash/fp'
import { isClientSide } from 'shared/utils/isClientSide'
import { ThemesEnum, THEME_DEFAULT } from './constants'
import { getThemeColors } from './themeVars'
import { LS_PREFIX } from 'config'

const LS_KEY_THEME = `${LS_PREFIX}_THEME`

export function setLSTheme(theme: ThemesEnum) {
  if (!isClientSide()) {
    return
  }

  return localStorage.setItem(LS_KEY_THEME, theme)
}

export function getLSTheme() {
  // TODO: Change LS to cookies in case of full server-render
  if (!isClientSide()) {
    return THEME_DEFAULT
  }

  let theme: string | null = localStorage.getItem(LS_KEY_THEME)

  if (!theme || !ThemesEnum.hasOwnProperty(theme)) {
    theme = THEME_DEFAULT
    setLSTheme(theme as ThemesEnum)
  }

  return theme as ThemesEnum
}

function addRootClass(theme: ThemesEnum) {
  document.documentElement.classList.add(`theme-${theme.toLowerCase()}`)
}

function removeRootClass() {
  const root = document.documentElement
  const themeClass = new RegExp(/theme-[^\s]+/)

  root.className = root.className.replace(themeClass, '')
}

export function loadThemeColors(theme: ThemesEnum) {
  const themeToSet = ThemesEnum.hasOwnProperty(theme) ? theme : THEME_DEFAULT

  flow(
    getThemeColors,
    toPairs,
    forEach(([key, color]: [string, string]) => {
      document.documentElement.style.setProperty(`--${key}`, color)
    }),
  )(themeToSet)

  removeRootClass()
  addRootClass(themeToSet)
}
