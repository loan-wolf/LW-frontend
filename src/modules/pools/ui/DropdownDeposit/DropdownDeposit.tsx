import { DropdownBurger, DropdownItem } from 'modules/dropdown'
import * as links from 'modules/router/links'

type Props = {
  className?: string
  onAddMore: () => void
}

export function DropdownDeposit({ onAddMore, className }: Props) {
  return (
    <DropdownBurger className={className}>
      <DropdownItem onClick={onAddMore} isUppercased>
        Deposit more
      </DropdownItem>
      <DropdownItem link={links.withdrawalDeposit} isUppercased>
        Withdraw
      </DropdownItem>
    </DropdownBurger>
  )
}
