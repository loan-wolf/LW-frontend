import { DropdownBurger, DropdownItem } from 'modules/dropdown'
import * as links from 'modules/router/links'

type Props = {
  loanId: string
  onBorrow: () => void
  onDeposit: () => void
  className?: string
}

export function DropdownCollateral({
  loanId,
  onBorrow,
  onDeposit,
  className,
}: Props) {
  return (
    <DropdownBurger className={className}>
      <DropdownItem onClick={onBorrow} isUppercased>
        Borrow
      </DropdownItem>
      <DropdownItem onClick={onDeposit} isUppercased>
        Deposit collateral
      </DropdownItem>
      <DropdownItem link={links.withdrawalCollateral(loanId)} isUppercased>
        Withdrawal collateral
      </DropdownItem>
    </DropdownBurger>
  )
}
