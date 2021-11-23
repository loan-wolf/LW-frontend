import { DropdownBurger, DropdownItem } from 'modules/dropdown'

type Props = {
  className?: string
  onAddMore: () => void
  onWithdraw: () => void
  onBorrow: () => void
}

export function DropdownLoan({
  className,
  onAddMore,
  onWithdraw,
  onBorrow,
}: Props) {
  return (
    <DropdownBurger className={className}>
      <DropdownItem onClick={onAddMore} isUppercased>
        Add more collateral
      </DropdownItem>
      <DropdownItem onClick={onWithdraw} isUppercased>
        Withdraw collateral
      </DropdownItem>
      <DropdownItem onClick={onBorrow} isUppercased>
        Borrow
      </DropdownItem>
    </DropdownBurger>
  )
}