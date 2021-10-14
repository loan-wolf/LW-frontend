import { DropdownBurger, DropdownItem } from 'modules/dropdown'

type Props = {
  className?: string
  onBorrow: () => void
  onDeposit: () => void
  onWithdraw: () => void
}

export function DropdownCollateral({
  onBorrow,
  onDeposit,
  onWithdraw,
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
      <DropdownItem onClick={onWithdraw} isUppercased>
        Withdrawal collateral
      </DropdownItem>
    </DropdownBurger>
  )
}
