import { Text } from 'shared/ui/common/Text'
import { Tooltip } from 'shared/ui/common/Tooltip'
import { Button } from 'shared/ui/controls/Button'
import { InfoFieldValue } from 'shared/ui/common/InfoFieldValue'
import { InfoFieldValueCouple } from 'shared/ui/common/InfoFieldValueCouple'
import { DropdownLoan } from '../DropdownLoan'
import { DashboardRow } from 'shared/ui/common/DashboardRow'
import { FormattedDate } from 'shared/ui/utils/FormattedDate'

import { getPoolAssetIcon } from 'modules/pools/constants/poolAssets'

import type { Loan } from 'modules/pools/types/Loan'
import { useLoanCalcs } from 'modules/pools/hooks/useLoanCalcs'
import { trimMiddleString } from 'shared/utils/trimMiddleString'
import * as links from 'modules/router/links'
import s from './DashboardRowLoan.module.scss'

type Props = {
  loan: Loan
  loanId: string
  isCompleted: boolean
  investorAddress: string
  className?: string
}

export function DashboardRowLoan({
  loan,
  loanId,
  isCompleted,
  investorAddress,
  className,
}: Props) {
  const {
    apr,
    borrowedAsset,
    principal,
    interest,
    totalDebt,
    totalDebtUSD,
    maturityTime,
    collateralAmount,
    collateralAsset,
  } = useLoanCalcs({
    loan,
    loanId,
    investorAddress,
  })

  return (
    <DashboardRow className={className}>
      <div className={s.column}>
        <InfoFieldValue
          label="Asset"
          value={
            borrowedAsset ? (
              <>
                {getPoolAssetIcon(borrowedAsset)} {borrowedAsset}
              </>
            ) : (
              'Unknown Asset'
            )
          }
        />
        <InfoFieldValue
          label="APR"
          value={
            <Tooltip tooltip={apr} className={s.truncatedWrap}>
              <span className={s.truncatedAmount}>{apr}</span>&nbsp;
              <span>%</span>
            </Tooltip>
          }
        />
      </div>

      <div className={s.column}>
        <InfoFieldValue
          label="Total debt"
          value={
            <div>
              <Tooltip tooltip={totalDebt} className={s.truncatedWrap}>
                <span className={s.truncatedAmount}>{totalDebt}</span>&nbsp;
                <span>{borrowedAsset}</span>
              </Tooltip>
              <Text tag="span" size={16} color="secondary">
                <Tooltip tooltip={totalDebtUSD} className={s.truncatedWrap}>
                  (<span className={s.truncatedAmount}>{totalDebtUSD}</span>
                  &nbsp;
                  <span>USD</span>)
                </Tooltip>
              </Text>
            </div>
          }
        />
        <InfoFieldValueCouple>
          <InfoFieldValue
            label="Principal"
            value={
              <Tooltip tooltip={principal} className={s.truncatedWrap}>
                <span className={s.truncatedAmount}>{principal}</span>&nbsp;
                <span>{borrowedAsset}</span>
              </Tooltip>
            }
          />
          <InfoFieldValue
            label="Interest"
            value={
              <Tooltip tooltip={interest} className={s.truncatedWrap}>
                <span className={s.truncatedAmount}>{interest}</span>&nbsp;
                <span>{borrowedAsset}</span>
              </Tooltip>
            }
          />
        </InfoFieldValueCouple>
      </div>

      <div className={s.column}>
        <InfoFieldValue
          label="Collateral Amount"
          value={
            <Tooltip tooltip={collateralAmount} className={s.truncatedWrap}>
              <span className={s.truncatedAmount}>{collateralAmount}</span>
              &nbsp;
              <span>{collateralAsset}</span>
            </Tooltip>
          }
        />
        <InfoFieldValue
          label="Maturity time "
          value={
            <>
              <FormattedDate format="DD–MMM–YYYY" date={maturityTime} />
              &nbsp;
              <Text tag="span" color="secondary">
                <FormattedDate format="hh:mm a" date={maturityTime} />
              </Text>
            </>
          }
        />
      </div>

      <div className={s.column}>
        <div className={s.actions}>
          {!isCompleted && (
            <Button
              link={links.repayment(investorAddress, loanId)}
              className={s.action}
              fashion="greenapple-ghost"
              size={40}
            >
              REPAY
            </Button>
          )}
          <DropdownLoan
            onAddMore={() => console.log('onAddMore')}
            onWithdraw={() => console.log('onWithdraw')}
            onBorrow={() => console.log('onBorrow')}
            className={s.action}
          />
        </div>
        <InfoFieldValue
          label="Loan Id"
          value={
            <>
              <Tooltip
                position="top-right"
                tooltip={loanId}
                classNameBody={s.loanIdTooltip}
              >
                {trimMiddleString(loanId, 5)}
              </Tooltip>
            </>
          }
        />
      </div>
    </DashboardRow>
  )
}
