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
        <InfoFieldValue isTruncated label="APR" value={apr} sign="%" />
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
            isTruncated
            label="Principal"
            value={principal}
            sign={borrowedAsset}
          />
          <InfoFieldValue
            isTruncated
            label="Interest"
            value={interest}
            sign={borrowedAsset}
          />
        </InfoFieldValueCouple>
      </div>

      <div className={s.column}>
        <InfoFieldValue
          isTruncated
          label="Collateral Amount"
          value={collateralAmount}
          sign={collateralAsset}
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
            loanId={loanId}
            investorAddress={investorAddress}
            onAddMore={() => console.log('onAddMore')}
            onBorrow={() => console.log('onBorrow')}
            className={s.action}
          />
        </div>
        <InfoFieldValue
          label="Loan Id"
          value={
            <Tooltip position="top-right" tooltip={loanId} maxWidth={210}>
              {trimMiddleString(loanId, 5)}
            </Tooltip>
          }
        />
      </div>
    </DashboardRow>
  )
}
