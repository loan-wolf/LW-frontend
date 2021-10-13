import { DropdownBurger, DropdownItem } from 'modules/dropdown'

type Props = {
  className?: string
  onAddMore: () => void
  onWithdraw: () => void
}

export function DropdownDeposit({ onAddMore, onWithdraw, className }: Props) {
  return (
    <DropdownBurger className={className}>
      <DropdownItem onClick={onAddMore} isUppercased>
        Deposit more
      </DropdownItem>
      <DropdownItem onClick={onWithdraw} isUppercased>
        Withdraw
      </DropdownItem>
    </DropdownBurger>
  )
}
