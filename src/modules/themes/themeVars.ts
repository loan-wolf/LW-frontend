import { isEqual, findIndex, mapValues, get } from 'lodash/fp'
import { ThemesEnum } from './constants'

const themedIndexes = [ThemesEnum.DARK, ThemesEnum.LIGHT]

const themedSets = {
  colorBranded: ['#3DA2FF', ''],
  colorGreenApple: ['#B7E82F', '#ffffff'],
  colorGreenApple20: ['rgba(183, 232, 47, 0.2)', '#ffffff'],
  colorGreenApple40: ['rgba(183, 232, 47, 0.4)', '#ffffff'],

  // Text
  colorText: ['#ffffff', '#000626'],
  colorTextContrast: ['#000626', '#ffffff'],
  colorTextSecondary: ['rgba(181, 190, 237, 0.5)', '#ffffff'],

  // Background
  colorBgDeep: ['#070315', '#F9FAFE'],
  colorBgTop: ['#141321', '#FFFFFF'],
  colorBgError: ['#9e0035', '#FFFFFF'],

  // Borders
  colorBorder: ['#424166', '#B4B5D8'],
  colorBorderHover: ['#424166', '#B4B5D8'],

  // Controls
  colorControlDefault: ['#fff', '#c8e8df'],
  colorControlDefaultHover: ['#fff', '#6cefa0'],
  colorControlDefaultActive: ['#fff', '#5aca86'],
  colorControlBg: ['rgba(193, 217, 254, 0.04)', ''],
  colorControlBgHover: ['rgba(193, 217, 254, 0.12)', ''],
  colorControlBorder: ['rgba(217, 218, 255, 0.24)', ''],

  // Input
  colorInputBorder: ['rgba(222, 215, 229, 0.16)', ''],
  colorInputBg: ['rgba(222, 215, 229, 0.03)', ''],
  colorInputPlaceholder: ['rgba(181, 190, 237, 0.5)', ''],
  colorInputBorderHover: ['rgba(181, 190, 237, 0.5)', ''],
  colorInputBorderFocus: ['rgba(183, 232, 47, 0.4)', ''],
  colorInputBorderError: ['rgba(255, 80, 80, 0.8)', ''],
  colorInputTextDisabled: ['', ''],
  colorInputBorderDisabled: ['', ''],
  colorInputPlaceholderDisabled: ['', ''],
}

const shared = {
  contentWidthNarrow: '400px',

  fieldMargin: '54px',
  fieldMarginConcatted: '8px',

  colorWhite: '#ffffff',

  durFast: '100ms',
  durMed: '200ms',
  durNorm: '300ms',

  // Easings
  linear: 'cubic-bezier(0.25, 0.25, 0.75, 0.75)',
  ease: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',

  easeIn: 'cubic-bezier(0.42, 0.0, 1.0, 1.0)',
  easeOut: 'cubic-bezier(0.0, 0.0, 0.58, 1.0)',
  easeInOut: 'cubic-bezier(0.42, 0.0, 0.58, 1.0)',

  easeInQuad: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
  easeInCubic: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
  easeInQuart: 'cubic-bezier(0.895, 0.03, 0.685, 0.22)',
  easeInQuint: 'cubic-bezier(0.755, 0.05, 0.855, 0.06)',
  easeInSine: 'cubic-bezier(0.47, 0.0, 0.745, 0.715)',
  easeInExpo: 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
  easeInCirc: 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
  easeInBack: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',

  easeOutQuad: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  easeOutCubic: 'cubic-bezier(0.215, 0.61, 0.355, 1.0)',
  easeOutQuart: 'cubic-bezier(0.165, 0.84, 0.44, 1.0)',
  easeOutQuint: 'cubic-bezier(0.23, 1.0, 0.32, 1.0)',
  easeOutSine: 'cubic-bezier(0.39, 0.575, 0.565, 1.0)',
  easeOutExpo: 'cubic-bezier(0.19, 1.0, 0.22, 1.0)',
  easeOutCirc: 'cubic-bezier(0.075, 0.82, 0.165, 1.0)',
  easeOutBack: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',

  easeInOutQuad: 'cubic-bezier(0.455, 0.03, 0.515, 0.955)',
  easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1.0)',
  easeInOutQuart: 'cubic-bezier(0.77, 0.0, 0.175, 1.0)',
  easeInOutQuint: 'cubic-bezier(0.86, 0.0, 0.07, 1.0)',
  easeInOutSine: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
  easeInOutExpo: 'cubic-bezier(1.0, 0.0, 0.0, 1.0)',
  easeInOutCirc: 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
  easeInOutBack: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
}

export function getThemeColors(theme: ThemesEnum) {
  const themeIndex = findIndex(isEqual(theme), themedIndexes)

  const themed = mapValues(get(themeIndex), themedSets) as {
    [key in keyof typeof themedSets]: string
  }

  return {
    ...shared,
    ...themed,
  }
}
