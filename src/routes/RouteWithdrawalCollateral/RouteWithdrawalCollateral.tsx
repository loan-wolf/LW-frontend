import { useState } from 'react'
import { match as Match } from 'react-router'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'
import { useContractSwr } from 'modules/contracts/hooks/useContractSwr'
import { useContractInstanceWeb3 } from 'modules/contracts/hooks/useContractInstance'

import {
  SuccessData,
  FormWithdrawalCollateral,
} from 'modules/pools/ui/FormWithdrawalCollateral'
import { SendedTransaction } from 'modules/pools/ui/SendedTransaction'
import { ContractSuccessTitle } from 'shared/ui/common/ContractSuccessTitle'
import { NarrowWrapper } from 'shared/ui/layout/NarrowWrapper'
import { PageLoader } from 'shared/ui/layout/PageLoader'

import { ContractCollateralManager } from 'modules/contracts/contracts'
import { getInvestorContractByAddress } from 'modules/pools/utils/getInvestorContract'
import { withWalletConnectCheck } from 'modules/wallet/hocs/withWalletConnectCheck'
import { createRoute } from 'modules/router/utils/createRoute'

type Props = {
  match: Match<{ investorAddress: string; loanId: string }>
}

function RouteWithdrawalCollateralRaw({ match }: Props) {
  const { chainId } = useWeb3()
  const [successData, setSuccessData] = useState<SuccessData | null>(null)

  const { investorAddress, loanId } = match.params

  const Investor = getInvestorContractByAddress(chainId, investorAddress)
  const investor = useContractInstanceWeb3(Investor)

  const { data: loan } = useContractSwr(investor, 'loanLookup', loanId)

  const { data: collateral } = ContractCollateralManager.useSwrWeb3(
    'getCollateralLookup',
    investor.address,
    loanId,
  )

  if (!loan || !collateral) {
    return <PageLoader />
  }

  if (successData) {
    return (
      <>
        <ContractSuccessTitle>Withdrawal is in progress.</ContractSuccessTitle>
        <SendedTransaction
          transactionType="Withdrawal collateral"
          tx={successData.tx}
        />
      </>
    )
  }

  return (
    <NarrowWrapper>
      <FormWithdrawalCollateral
        loan={loan}
        loanId={loanId}
        collateralAddress={collateral[0]}
        collateralAmountWei={collateral[1]}
        onSuccess={setSuccessData}
      />
    </NarrowWrapper>
  )
}

const RouteWithdrawalCollateral = withWalletConnectCheck(
  RouteWithdrawalCollateralRaw,
)

export const routeWithdrawalCollateral = createRoute({
  headerTitle: 'Withdrawal',
  layoutType: 'narrow-extended',
  component: RouteWithdrawalCollateral,
})
