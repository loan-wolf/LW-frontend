import cns from 'classnames'

import { Tooltip } from 'shared/ui/common/Tooltip'
import { ReactComponent as TimeSVG } from 'assets/time.svg'

import { TxStatus } from 'modules/blockChain/types'
import s from './TransactionStatusBadge.module.scss'

type Props = {
  status: TxStatus
  onOpen?: () => void
}

export function TransactionStatusBadge({ status, onOpen }: Props) {
  let content
  let statusClassName

  if (status === 'empty') {
    statusClassName = s.isPending
    content = (
      <>
        <TimeSVG /> Not started
      </>
    )
  }

  if (status === 'pending') {
    statusClassName = s.isPending
    content = (
      <>
        <TimeSVG /> Pending
      </>
    )
  }

  if (status === 'failed') {
    statusClassName = s.isFailed
    content = (
      <>
        <TimeSVG /> Failed
      </>
    )
  }

  if (status === 'success') {
    statusClassName = s.isConfirmed
    content = (
      <>
        <TimeSVG /> Confirmed
      </>
    )
  }

  if (!content) {
    return null
  }

  if (onOpen) {
    return (
      <Tooltip tooltip="Click to open etherscan">
        <button
          type="button"
          className={cns(s.badge, s.isInteractable, statusClassName)}
          onClick={onOpen}
        >
          {content}
        </button>
      </Tooltip>
    )
  }

  return <div className={cns(s.badge, statusClassName)}>{content}</div>
}
