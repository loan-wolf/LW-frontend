import * as ethers from 'ethers'

import { Tooltip } from 'shared/ui/common/Tooltip'
import { InfoFieldValue } from 'shared/ui/common/InfoFieldValue'
import { DropdownCollateral } from '../DropdownCollateral'
import { DashboardRow } from 'shared/ui/common/DashboardRow'

import type { BigNumberish } from '@ethersproject/bignumber'
import { getPoolAssetIcon, PoolAsset } from 'modules/pools/constants/poolAssets'
import { trimMiddleString } from 'shared/utils/trimMiddleString'
import s from './DashboardRowCollateral.module.scss'

export type CollateralDataMock = {
  loanId: BigNumberish
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
    loanId,
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
      <InfoFieldValue
        label="Loan id"
        value={trimMiddleString(loanId.toString(), 5)}
        className={s.column}
      />
      <div className={s.column}>
        <DropdownCollateral
          loanId={loanId.toString()}
          onBorrow={() => console.log('onBorrow')}
          onDeposit={() => console.log('onDeposit')}
        />
      </div>
    </DashboardRow>
  )
}
