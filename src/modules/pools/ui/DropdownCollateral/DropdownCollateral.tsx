import { DropdownBurger, DropdownItem } from 'modules/dropdown'
import * as links from 'modules/router/links'

type Props = {
  className?: string
  onBorrow: () => void
  onDeposit: () => void
}

export function DropdownCollateral({ onBorrow, onDeposit, className }: Props) {
  return (
    <DropdownBurger className={className}>
      <DropdownItem onClick={onBorrow} isUppercased>
        Borrow
      </DropdownItem>
      <DropdownItem onClick={onDeposit} isUppercased>
        Deposit collateral
      </DropdownItem>
      <DropdownItem link={links.withdrawal} isUppercased>
        Withdrawal collateral
      </DropdownItem>
    </DropdownBurger>
  )
}
