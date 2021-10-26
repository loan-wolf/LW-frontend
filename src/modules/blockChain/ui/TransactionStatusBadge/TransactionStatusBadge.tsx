import cns from 'classnames'
import { ReactComponent as TimeSVG } from 'assets/time.svg'
import s from './TransactionStatusBadge.module.scss'

type Props = {
  status: 'pending' | 'failed' | 'confirmed'
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

  return (
    <div className={cns(s.badge, s.isConfirmed)}>
      <TimeSVG /> Confirmed
    </div>
  )
}
