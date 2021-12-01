import * as ethers from 'ethers'

import { Tooltip } from 'shared/ui/common/Tooltip'
import { InfoFieldValue } from 'shared/ui/common/InfoFieldValue'
import { DropdownCollateral } from '../DropdownCollateral'
import { DashboardRow } from 'shared/ui/common/DashboardRow'

import type { BigNumberish } from '@ethersproject/bignumber'
import { getPoolAssetIcon, PoolAsset } from 'modules/pools/constants/poolAssets'
import s from './DashboardRowCollateral.module.scss'

export type CollateralDataMock = {
  asset?: PoolAsset
  amount: BigNumberish
  // unlockDate: string
}

type Props = {
  collateral: CollateralDataMock
  className?: string
}

export function DashboardRowCollateral({ collateral, className }: Props) {
  const {
    asset,
    amount,
    //  unlockDate
  } = collateral

  const collateralAmount = ethers.utils.formatEther(amount)

  return (
    <DashboardRow className={className}>
      <InfoFieldValue
        label="Asset"
        value={
          asset ? (
            <>
              {getPoolAssetIcon(asset)} {asset}
            </>
          ) : (
            'Unknown'
          )
        }
        className={s.column}
      />
      <InfoFieldValue
        label="Amount"
        value={
          <>
            <Tooltip tooltip={collateralAmount} className={s.collateralWrap}>
              <span className={s.collateralAmount}>{collateralAmount}</span>{' '}
              <span>{asset}</span>
            </Tooltip>
          </>
        }
        className={s.column}
      />
      {/* <InfoFieldValue
        label="Unlock date"
        value={unlockDate}
        className={s.column}
      /> */}
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
