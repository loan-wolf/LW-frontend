import cns from 'classnames'
import { useMemo } from 'react'
import { trimAddress } from 'modules/blockChain/utils/trimAddress'
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
    () => trimAddress(address, symbols),
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
