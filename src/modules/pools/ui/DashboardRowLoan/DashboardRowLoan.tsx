import { Text } from 'shared/ui/common/Text'
import { Button } from 'shared/ui/controls/Button'
import { InfoFieldValue } from 'shared/ui/common/InfoFieldValue'
import { InfoFieldValueCouple } from 'shared/ui/common/InfoFieldValueCouple'
import { DropdownLoan } from '../DropdownLoan'
import { DashboardRow } from 'shared/ui/common/DashboardRow'

import { getPoolAssetIcon, PoolAsset } from 'modules/pools/constants/poolAssets'

import s from './DashboardRowLoan.module.scss'

export type LoanDataMock = {
  id: string
  borrowedAmount: number
  borrowedAsset: PoolAsset
  collateralAmount: number
  collateralAsset: PoolAsset
  apr: number
  time: string
  principal: number
  interest: number
}

type Props = {
  loan: LoanDataMock
  className?: string
}

export function DashboardRowLoan({ loan, className }: Props) {
  const {
    id,
    borrowedAmount,
    borrowedAsset,
    collateralAmount,
    collateralAsset,
    apr,
    time,
    principal,
    interest,
  } = loan

  const borrowedAmountUSD = borrowedAmount * 23

  return (
    <DashboardRow className={className}>
      <div className={s.column}>
        <InfoFieldValue
          label="Asset"
          value={
            <>
              {getPoolAssetIcon(borrowedAsset)} {borrowedAsset}
            </>
          }
        />
        <InfoFieldValue label="APR" value={`${apr}%`} />
      </div>

      <div className={s.column}>
        <InfoFieldValue
          label="Total debt"
          value={
            <div>
              {borrowedAmount}&nbsp;{borrowedAsset}{' '}
              <Text tag="span" size={16} color="secondary">
                ({borrowedAmountUSD * 23}&nbsp;USD)
              </Text>
            </div>
          }
        />
        <InfoFieldValueCouple>
          <InfoFieldValue
            label="Principal"
            value={
              <>
                {principal}&nbsp;{borrowedAsset}
              </>
            }
          />
          <InfoFieldValue
            label="Interest"
            value={
              <>
                {interest}&nbsp;{borrowedAsset}
              </>
            }
          />
        </InfoFieldValueCouple>
      </div>

      <div className={s.column}>
        <InfoFieldValue
          label="Collateral Amount"
          value={
            <>
              {collateralAmount} {collateralAsset}
            </>
          }
        />
        <InfoFieldValue label="Maturity time " value={time} />
      </div>

      <div className={s.column}>
        <div className={s.actions}>
          <Button className={s.action} fashion="greenapple-ghost" size={40}>
            REPAY
          </Button>
          <DropdownLoan
            onAddMore={() => console.log('onAddMore')}
            onWithdraw={() => console.log('onWithdraw')}
            onBorrow={() => console.log('onBorrow')}
            className={s.action}
          />
        </div>
        <InfoFieldValue label="Loan Id" value={id} />
      </div>
    </DashboardRow>
  )
}
