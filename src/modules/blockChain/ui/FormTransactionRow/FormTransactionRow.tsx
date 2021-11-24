import cns from 'classnames'
import type { useTransactionSender } from 'modules/blockChain/hooks/useTransactionSender'

import { Text } from 'shared/ui/common/Text'
import { TransactionStatusBadge } from 'modules/blockChain/ui/TransactionStatusBadge'

import s from './FormTransactionRow.module.scss'

type Props = {
  label: React.ReactNode
  tx: ReturnType<typeof useTransactionSender>
  className?: string
}

export function FormTransactionRow({ label, tx, className }: Props) {
  return (
    <div className={cns(s.wrap, className)}>
      <Text size={14}>{label}: </Text>
      <TransactionStatusBadge
        status={tx.status}
        onOpen={!tx.isEmpty && !tx.isSigning ? tx.open : undefined}
      />
    </div>
  )
}
