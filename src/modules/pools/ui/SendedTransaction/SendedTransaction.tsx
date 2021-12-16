import * as ethers from 'ethers'

import { InfoFieldValue } from 'shared/ui/common/InfoFieldValue'
import { TransactionStatusBadge } from 'modules/blockChain/ui/TransactionStatusBadge'

import s from './SendedTransaction.module.scss'
import { useTransactionStatus } from 'modules/blockChain/hooks/useTransactionStatus'
import { useEtherscanOpener } from 'modules/blockChain/hooks/useEtherscanOpener'
import { FormattedDate } from 'shared/ui/utils/FormattedDate'

type Props = {
  tx: ethers.ContractTransaction
  transactionType: React.ReactNode
  withTotalAmount?: boolean
}

export function SendedTransaction(props: Props) {
  const { tx, transactionType, withTotalAmount = true } = props
  const txStatus = useTransactionStatus({
    hash: tx.hash,
    defaultStatus: 'pending',
  })

  const handleOpen = useEtherscanOpener(tx.hash, 'tx')

  return (
    <div className={s.wrap}>
      <div className={s.row}>
        <InfoFieldValue
          label="Type of transaction"
          value={transactionType}
          className={s.column}
        />
        <InfoFieldValue
          label="Time"
          value={
            tx.timestamp ? (
              <FormattedDate format="DD-MMM-YYYY hh:mm a" date={tx.timestamp} />
            ) : (
              '-'
            )
          }
          className={s.column}
        />
      </div>
      <div className={s.row}>
        <InfoFieldValue
          label="Amount"
          value="— USD"
          valueColor="secondary"
          className={s.column}
        />
        <InfoFieldValue
          label="Gas cost"
          value="— USD"
          valueColor="secondary"
          className={s.column}
        />
      </div>
      <div className={s.line} />
      <div className={s.row}>
        {withTotalAmount && (
          <InfoFieldValue
            label="Total Amount"
            value="— USD"
            valueSize={28}
            className={s.column}
          />
        )}
        <div className={s.column}>
          <TransactionStatusBadge
            status={txStatus.status}
            onOpen={handleOpen}
          />
        </div>
      </div>
    </div>
  )
}
