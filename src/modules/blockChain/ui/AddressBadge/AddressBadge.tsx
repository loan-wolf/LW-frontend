import cns from 'classnames'
import { useMemo } from 'react'
import { trimMiddleString } from 'shared/utils/trimMiddleString'
import s from './AddressBadge.module.scss'

type Props = {
  symbols?: number
  address: string
  onClick: React.MouseEventHandler
  className?: string
}

export function AddressBadge({
  symbols = 3,
  address,
  onClick,
  className,
}: Props) {
  const trimmedAddress = useMemo(
    () => trimMiddleString(address, symbols),
    [address, symbols],
  )
  return (
    <span
      onClick={onClick}
      className={cns(s.addressBadge, className, {
        [s.isClickable]: Boolean(onClick),
      })}
    >
      {trimmedAddress}
    </span>
  )
}
