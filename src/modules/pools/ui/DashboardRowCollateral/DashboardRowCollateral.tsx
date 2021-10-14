import { InfoFieldValue } from 'shared/ui/common/InfoFieldValue'
import { DropdownCollateral } from '../DropdownCollateral'
import { DashboardRow } from 'shared/ui/common/DashboardRow'

import { getPoolAssetIcon, PoolAsset } from 'modules/pools/constants/poolAssets'
import s from './DashboardRowCollateral.module.scss'

export type CollateralDataMock = {
  collateralAsset: PoolAsset
  amount: number
  unlockDate: string
}

type Props = {
  collateral: CollateralDataMock
  className?: string
}

export function DashboardRowCollateral({ collateral, className }: Props) {
  const { collateralAsset, amount, unlockDate } = collateral
  return (
    <DashboardRow className={className}>
      <InfoFieldValue
        label="Asset"
        value={
          <>
            {getPoolAssetIcon(collateralAsset)} {collateralAsset}
          </>
        }
        className={s.column}
      />
      <InfoFieldValue
        label="Amount"
        value={
          <>
            {amount} {collateralAsset}
          </>
        }
        className={s.column}
      />
      <InfoFieldValue
        label="Unlock date"
        value={unlockDate}
        className={s.column}
      />
      <div className={s.column}>
        <DropdownCollateral
          onBorrow={() => console.log('onBorrow')}
          onDeposit={() => console.log('onDeposit')}
          onWithdraw={() => console.log('onWithdraw')}
        />
      </div>
    </DashboardRow>
  )
}
