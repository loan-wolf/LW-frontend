export const DropdownPopOrigin = {
  BottomLeft: 'bottom-left',
  BottomCenter: 'bottom-center',
  BottomRight: 'bottom-right',
  TopLeft: 'top-left',
  TopCenter: 'top-center',
  TopRight: 'top-right',
} as const

// Intentionally
// Not enum for support string-based props api
// Not union to make easier use in position calculation logic
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type DropdownPopOrigin =
  typeof DropdownPopOrigin[keyof typeof DropdownPopOrigin]

export type DropdownSideType = 'top' | 'right' | 'bottom' | 'left' | 'center'

export type DropdownDirection = {
  p: [DropdownSideType, DropdownSideType]
  toBot: boolean
  toTop: boolean
  toRight: boolean
  toLeft: boolean
  isCentered: boolean
}

export type DropdownPosition = {
  toTopPos: number
  toBotPos: number
  left: number
}

export type DropdownTarget = DropdownPosition & {
  el?: HTMLElement
}

export type DropdownOpenHandler = (target: DropdownTarget) => void

export type DropdownFashion = 'default' | 'greenapple'
