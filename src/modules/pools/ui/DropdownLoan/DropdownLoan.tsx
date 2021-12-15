import { DropdownBurger, DropdownItem } from 'modules/dropdown'
import * as links from 'modules/router/links'

type Props = {
  className?: string
  loanId: string
  investorAddress: string
  onAddMore: () => void
  onBorrow: () => void
}

export function DropdownLoan({
  className,
  loanId,
  investorAddress,
  onAddMore,
  onBorrow,
}: Props) {
  return (
    <DropdownBurger className={className}>
      <DropdownItem onClick={onAddMore} isUppercased>
        Add more collateral
      </DropdownItem>
      <DropdownItem
        isUppercased
        link={links.withdrawalCollateral(investorAddress, loanId)}
      >
        Withdraw collateral
      </DropdownItem>
      <DropdownItem onClick={onBorrow} isUppercased>
        Borrow
      </DropdownItem>
    </DropdownBurger>
  )
}
