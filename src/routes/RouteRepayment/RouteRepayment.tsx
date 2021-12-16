import { match as Match } from 'react-router'
import { useState } from 'react'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'
import { useContractSwr } from 'modules/contracts/hooks/useContractSwr'
import { useContractInstanceWeb3 } from 'modules/contracts/hooks/useContractInstance'

import { FormRepayment, SuccessData } from 'modules/pools/ui/FormRepayment'
import { SendedTransaction } from 'modules/pools/ui/SendedTransaction'
import { ContractSuccessTitle } from 'shared/ui/common/ContractSuccessTitle'
import { NarrowWrapper } from 'shared/ui/layout/NarrowWrapper'
import { PageLoader } from 'shared/ui/layout/PageLoader'

import { getInvestorContractByAddress } from 'modules/pools/utils/getInvestorContract'
import { withWalletConnectCheck } from 'modules/wallet/hocs/withWalletConnectCheck'
import { createRoute } from 'modules/router/utils/createRoute'

type Props = {
  match: Match<{ investorAddress: string; loanId: string }>
}

function RouteRepaymentRaw({ match }: Props) {
  const { investorAddress, loanId } = match.params
  const { chainId } = useWeb3()
  const [successData, setSuccessData] = useState<SuccessData | null>(null)

  const Investor = getInvestorContractByAddress(chainId, investorAddress)
  const investor = useContractInstanceWeb3(Investor)

  const { isLoading, data: loan } = useContractSwr(investor, 'loanLookup', [
    loanId,
  ])

  if (isLoading || !loan) {
    return <PageLoader />
  }

  if (successData) {
    return (
      <>
        <ContractSuccessTitle>Repayment is in progress.</ContractSuccessTitle>
        <SendedTransaction transactionType="Repayment" tx={successData.tx} />
      </>
    )
  }

  return (
    <NarrowWrapper>
      <FormRepayment
        loan={loan}
        loanId={loanId}
        investorAddress={investorAddress}
        onSuccess={setSuccessData}
      />
    </NarrowWrapper>
  )
}

const RouteRepayment = withWalletConnectCheck(RouteRepaymentRaw)

export const routeRepayment = createRoute({
  headerTitle: 'Repayment',
  layoutType: 'narrow-extended',
  component: RouteRepayment,
})
