import * as ethers from 'ethers'
import { useMemo } from 'react'
import { useCurrentChain } from 'modules/blockChain/hooks/useCurrentChain'

import { Text } from 'shared/ui/common/Text'
import { Button } from 'shared/ui/controls/Button'
import { InfoFieldValue } from 'shared/ui/common/InfoFieldValue'
import { InfoFieldValueCouple } from 'shared/ui/common/InfoFieldValueCouple'
import { DropdownLoan } from '../DropdownLoan'
import { DashboardRow } from 'shared/ui/common/DashboardRow'
import { FormattedDate } from 'shared/ui/utils/FormattedDate'

import {
  getPoolAssetIcon,
  getPoolAssetByAddress,
} from 'modules/pools/constants/poolAssets'

// import { ContractCollateralManager } from 'modules/contracts/contracts'
import type { Loan } from 'modules/pools/types/Loan'
import * as links from 'modules/router/links'
import s from './DashboardRowLoan.module.scss'

type Props = {
  loan: Loan
  loanId: number
  investorAddress: string
  className?: string
}

export function DashboardRowLoan({
  loan,
  loanId,
  investorAddress,
  className,
}: Props) {
  const chainId = useCurrentChain()
  const {
    ERC20Address,
    principal: principalRaw,
    interestRate,
    paymentDueDate,
  } = loan

  const borrowedAsset = useMemo(
    () => getPoolAssetByAddress(ERC20Address, chainId),
    [ERC20Address, chainId],
  )

  // const collateralAmount = ContractCollateralManager.useSwrWeb3(
  //   'getCollateralLookup',
  //   investorAddress,
  //   loanId,
  // )

  const principal = Number(ethers.utils.formatEther(principalRaw))
  const apr = Number(interestRate) / 100
  const interest = principal / apr
  const totalDebt = principal + interest
  const totalDebtUSD = '—'
  // const collateralAsset = collateralAmount.data[0]
  // const collateralAmount = ethers.utils.formatEther(collateralAmount.data[1])

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
        <InfoFieldValue label="APR" value={`${apr}%`} />
      </div>

      <div className={s.column}>
        <InfoFieldValue
          label="Total debt"
          value={
            <div>
              {totalDebt}&nbsp;{borrowedAsset}{' '}
              <Text tag="span" size={16} color="secondary">
                ({totalDebtUSD}&nbsp;USD)
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
              —
              {/* {collateralAmount}{' '}
              {collateralAsset} */}
            </>
          }
        />
        <InfoFieldValue
          label="Maturity time "
          value={
            <>
              <FormattedDate
                format="DD–MMM–YYYY"
                date={Number(paymentDueDate)}
              />
              &nbsp;
              <Text tag="span" color="secondary">
                <FormattedDate format="hh:mm a" date={Number(paymentDueDate)} />
              </Text>
            </>
          }
        />
      </div>

      <div className={s.column}>
        <div className={s.actions}>
          <Button
            link={links.repayment}
            className={s.action}
            fashion="greenapple-ghost"
            size={40}
          >
            REPAY
          </Button>
          <DropdownLoan
            onAddMore={() => console.log('onAddMore')}
            onWithdraw={() => console.log('onWithdraw')}
            onBorrow={() => console.log('onBorrow')}
            className={s.action}
          />
        </div>
        <InfoFieldValue label="Loan Id" value={loanId} />
      </div>
    </DashboardRow>
  )
}
