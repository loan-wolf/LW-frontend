import { DropdownBurger, DropdownItem } from 'modules/dropdown'
import * as links from 'modules/router/links'

type Props = {
  poolAddress: string
  className?: string
  onAddMore: () => void
}

export function DropdownDeposit({ poolAddress, onAddMore, className }: Props) {
  return (
    <DropdownBurger className={className}>
      <DropdownItem onClick={onAddMore} isUppercased>
        Deposit more
      </DropdownItem>
      <DropdownItem link={links.withdrawalDeposit(poolAddress)} isUppercased>
        Withdraw
      </DropdownItem>
    </DropdownBurger>
  )
}
