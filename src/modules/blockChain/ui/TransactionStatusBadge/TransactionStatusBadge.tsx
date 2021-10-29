import cns from 'classnames'
import { ReactComponent as TimeSVG } from 'assets/time.svg'
import { TxStatus } from 'modules/blockChain/types'
import s from './TransactionStatusBadge.module.scss'

type Props = {
  status: TxStatus
}

export function TransactionStatusBadge({ status }: Props) {
  if (status === 'pending') {
    return (
      <div className={cns(s.badge, s.isPending)}>
        <TimeSVG /> Pending
      </div>
    )
  }

  if (status === 'failed') {
    return (
      <div className={cns(s.badge, s.isFailed)}>
        <TimeSVG /> Failed
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className={cns(s.badge, s.isConfirmed)}>
        <TimeSVG /> Confirmed
      </div>
    )
  }

  return null
}
