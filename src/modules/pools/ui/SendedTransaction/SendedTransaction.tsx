import * as ethers from 'ethers'

import { Button } from 'shared/ui/controls/Button'
import { InfoFieldValue } from 'shared/ui/common/InfoFieldValue'
import { TransactionStatusBadge } from 'modules/blockChain/ui/TransactionStatusBadge'

import s from './SendedTransaction.module.scss'
import { useTransactionStatus } from 'modules/blockChain/hooks/useTransactionStatus'
import { useEtherscanOpener } from 'modules/blockChain/hooks/useEtherscanOpener'

type Props = {
  tx: ethers.ContractTransaction
  transactionType: React.ReactNode
}

export function SendedTransaction({ tx, transactionType }: Props) {
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
        <InfoFieldValue label="Time" value="—" className={s.column} />
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
        <InfoFieldValue
          label="Total Amount"
          value="— USD"
          valueSize={28}
          className={s.column}
        />
        <div className={s.column}>
          <TransactionStatusBadge
            status={txStatus.status}
            onOpen={handleOpen}
          />
        </div>
      </div>
      <Button size={40} fashion="glass" onClick={handleOpen}>
        Show on etherscan
      </Button>
    </div>
  )
}
