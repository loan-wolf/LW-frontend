import { useCallback, useState } from 'react'
import type { DropdownTarget, DropdownOpenHandler } from '../types'

export function useDropdownState(): [
  DropdownTarget | null,
  DropdownOpenHandler,
  () => void,
] {
  const [menuTarget, setMenuTarget] = useState<DropdownTarget | null>(null)
  const handleCloseMenu = useCallback(() => setMenuTarget(null), [])
  const handleToggleMenu = useCallback(
    (target: DropdownTarget) => {
      if (menuTarget === null) {
        setMenuTarget(target)
      } else {
        handleCloseMenu()
      }
    },
    [menuTarget, setMenuTarget, handleCloseMenu],
  )

  return [menuTarget, handleToggleMenu, handleCloseMenu]
}
