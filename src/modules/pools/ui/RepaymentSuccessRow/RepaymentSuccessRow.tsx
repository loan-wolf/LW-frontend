import { InfoFieldValue } from 'shared/ui/common/InfoFieldValue'
import { TransactionStatusBadge } from 'modules/blockChain/ui/TransactionStatusBadge'

import s from './RepaymentSuccessRow.module.scss'

export function RepaymentSuccessRow() {
  return (
    <div className={s.wrap}>
      <div className={s.row}>
        <InfoFieldValue
          label="Type of transaction"
          value="Repayment"
          className={s.column}
        />
        <InfoFieldValue
          label="Time"
          value="2021-10-10 19:59:59"
          className={s.column}
        />
      </div>
      <div className={s.row}>
        <InfoFieldValue
          label="Amount"
          value="12 339 USD"
          valueColor="secondary"
          className={s.column}
        />
        <InfoFieldValue
          label="Gas cost"
          value="13 USD"
          valueColor="secondary"
          className={s.column}
        />
      </div>
      <div className={s.line} />
      <div className={s.row}>
        <InfoFieldValue
          label="Total Amount"
          value="12 352 USD"
          valueSize={28}
          className={s.column}
        />
        <div className={s.column}>
          <TransactionStatusBadge status="pending" />
        </div>
      </div>
    </div>
  )
}
