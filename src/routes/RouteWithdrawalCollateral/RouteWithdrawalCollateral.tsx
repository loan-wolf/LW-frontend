import { useState } from 'react'
import { match as Match } from 'react-router'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'

import {
  SuccessData,
  FormWithdrawalCollateral,
} from 'modules/pools/ui/FormWithdrawalCollateral'
import { SendedTransaction } from 'modules/pools/ui/SendedTransaction'
import { ContractSuccessTitle } from 'shared/ui/common/ContractSuccessTitle'
import { NarrowWrapper } from 'shared/ui/layout/NarrowWrapper'
import { PageLoader } from 'shared/ui/layout/PageLoader'

import {
  ContractInvestor_DAI_rDAI1,
  ContractCollateralManager,
} from 'modules/contracts/contracts'
import { withWalletConnectCheck } from 'modules/wallet/hocs/withWalletConnectCheck'
import { createRoute } from 'modules/router/utils/createRoute'

type Props = {
  match: Match<{ loanId: string }>
}

function RouteWithdrawalCollateralRaw({ match }: Props) {
  const { chainId } = useWeb3()

  const loanId = match.params.loanId
  // TODO: get actual investor
  const loanReq = ContractInvestor_DAI_rDAI1.useSwrWeb3('loanLookup', loanId)
  const collateralReq = ContractCollateralManager.useSwrWeb3(
    'getCollateralLookup',
    ContractInvestor_DAI_rDAI1.chainAddress.get(chainId),
    loanId,
  )
  const [successData, setSuccessData] = useState<SuccessData | null>(null)

  const { data: loan } = loanReq
  const { data: collateral } = collateralReq

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
        collateralAmount={collateral[1]}
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
