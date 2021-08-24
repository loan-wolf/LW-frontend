import { isEqual, findIndex, mapValues, get } from 'lodash/fp'
import { ThemesEnum } from './constants'

const shared = {
  colorWhite: '#ffffff',

  durFast: '100ms',
  durNorm: '300ms',
}

const themedIndexes = [ThemesEnum.DARK, ThemesEnum.LIGHT]

const themedSets = {
  // Text
  colorTextDefault: ['#ffffff', '#000626'],
  colorTextContrast: ['#000626', '#ffffff'],

  // Background
  colorBgDeep: ['#070315', '#F9FAFE'],
  colorBgTop: ['#141321', '#FFFFFF'],

  // Borders
  colorBorder: ['#424166', '#B4B5D8'],
  colorBorderHover: ['#424166', '#B4B5D8'],

  // Controls
  colorControlDefault: ['#fff', '#c8e8df'],
  colorControlDefaultHover: ['#fff', '#6cefa0'],
  colorControlDefaultActive: ['#fff', '#5aca86'],

  // Misc
  colorUserSelect: ['#fff', '#dadaff'],
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
