import { useState } from 'react'
import { match as Match } from 'react-router'

import { FormRepayment, SuccessData } from 'modules/pools/ui/FormRepayment'
import { SendedTransaction } from 'modules/pools/ui/SendedTransaction'
import { ContractSuccessTitle } from 'shared/ui/common/ContractSuccessTitle'
import { NarrowWrapper } from 'shared/ui/layout/NarrowWrapper'
import { PageLoader } from 'shared/ui/layout/PageLoader'

import { ContractInvestor_DAI_rDAI1 } from 'modules/contracts/contracts'
import { withWalletConnectCheck } from 'modules/wallet/hocs/withWalletConnectCheck'
import { createRoute } from 'modules/router/utils/createRoute'

type Props = {
  match: Match<{ loanId: string }>
}

function RouteRepaymentRaw({ match }: Props) {
  const loanId = match.params.loanId
  // TODO: Get actual investor
  const loanReq = ContractInvestor_DAI_rDAI1.useSwrWeb3('loanLookup', loanId)
  const [successData, setSuccessData] = useState<SuccessData | null>(null)

  const { data: loan } = loanReq

  if (loanReq.isLoading || !loan) {
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
      <FormRepayment loan={loan} loanId={loanId} onSuccess={setSuccessData} />
    </NarrowWrapper>
  )
}

const RouteRepayment = withWalletConnectCheck(RouteRepaymentRaw)

export const routeRepayment = createRoute({
  headerTitle: 'Repayment',
  layoutType: 'narrow-extended',
  component: RouteRepayment,
})
