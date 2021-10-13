import { InfoFieldValue } from 'shared/ui/common/InfoFieldValue'
import { DropdownDeposit } from '../DropdownDeposit'
import { DashboardRow } from 'shared/ui/common/DashboardRow'

import { getPoolAssetIcon, PoolAsset } from 'modules/pools/constants/poolAssets'
import s from './DashboardRowDeposit.module.scss'

export type DepositDataMock = {
  depositedAsset: PoolAsset
  amount: number
  apy: number
  interest: number
}

type Props = {
  deposit: DepositDataMock
  className?: string
}

export function DashboardRowDeposit({ deposit, className }: Props) {
  const { depositedAsset, amount, apy, interest } = deposit
  return (
    <DashboardRow className={className}>
      <InfoFieldValue
        label="Asset"
        value={
          <>
            {getPoolAssetIcon(depositedAsset)} {depositedAsset}
          </>
        }
        className={s.column}
      />
      <InfoFieldValue
        label="Deposit"
        value={
          <>
            {amount} {depositedAsset}
          </>
        }
        className={s.column}
      />
      <InfoFieldValue label="APY" value={<>{apy}%</>} className={s.column} />
      <InfoFieldValue
        label="Accrued interest"
        value={
          <>
            {interest} {depositedAsset}
          </>
        }
        className={s.column}
      />
      <div className={s.column}>
        <DropdownDeposit
          onAddMore={() => console.log('onAddMore')}
          onWithdraw={() => console.log('onWithdraw')}
        />
      </div>
    </DashboardRow>
  )
}
