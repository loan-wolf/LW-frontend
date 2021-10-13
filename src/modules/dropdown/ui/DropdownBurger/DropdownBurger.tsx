import { useCallback } from 'react'
import { useDropdownState } from '../../hooks/useDropdownState'

import { Button } from 'shared/ui/controls/Button'
import { Dropdown } from '../Dropdown'
import { ReactComponent as BurgerSVG } from 'assets/burger.svg'
import { ReactComponent as CloseSVG } from 'assets/close.svg'

type Props = {
  className?: string
  children?: React.ReactNode
}

export function DropdownBurger({ className, children }: Props) {
  const [menuTarget, handleToggleMenu, handleCloseMenu] = useDropdownState()

  const handleOpen = useCallback(
    (e: React.MouseEvent) => {
      const el = e.currentTarget as HTMLElement
      const rect = el.getBoundingClientRect()

      handleToggleMenu({
        toTopPos: rect.top - 10,
        toBotPos: rect.top + rect.height + 10,
        left: rect.left + rect.width,
        el,
      })
    },
    [handleToggleMenu],
  )

  return (
    <>
      <Button
        onClick={handleOpen}
        className={className}
        fashion="greenapple"
        isSquare
        size={40}
      >
        {menuTarget ? <CloseSVG /> : <BurgerSVG />}
      </Button>
      {menuTarget && (
        <Dropdown
          fashion="greenapple"
          target={menuTarget}
          onClose={handleCloseMenu}
        >
          {children}
        </Dropdown>
      )}
    </>
  )
}
