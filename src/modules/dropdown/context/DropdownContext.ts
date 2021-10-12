import { createContext } from 'react'
import { noop } from 'lodash/fp'
import type { DropdownFashion } from '../types'

type Context = {
  fashion: DropdownFashion
  handleClose: () => void
}

export const DropdownContext = createContext<Context>({
  fashion: 'default',
  handleClose: noop,
})
