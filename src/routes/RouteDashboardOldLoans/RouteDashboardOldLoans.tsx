import { useMemo } from 'react'
import { useLoansList } from 'modules/pools/hooks/useLoansList'
import { useCurrentChain } from 'modules/blockChain/hooks/useCurrentChain'

import { PageLoader } from 'shared/ui/layout/PageLoader'
import { DashboardRowLoan } from 'modules/pools/ui/DashboardRowLoan'
import { DashboardEmptyCTA } from 'modules/pools/ui/DashboardEmptyCTA'

import { ContractInvestor } from 'modules/contracts/contracts'
import { createRoute } from 'modules/router/utils/createRoute'
import * as links from 'modules/router/links'

function RouteDashboardOldLoans() {
  const loans = useLoansList()
  const chainId = useCurrentChain()
  const investorAddress = ContractInvestor.chainAddress.get(chainId)

  const loansDisplay = useMemo(
    () => loans.data?.filter(loan => loan.isCompleted),
    [loans.data],
  )

  if (loans.isLoading) {
    return <PageLoader />
  }

  if (!loansDisplay || loansDisplay.length === 0) {
    return (
      <DashboardEmptyCTA
        link={links.borrow}
        fashion="purple"
        timeText="old"
        entityName="loans"
        actionText="Borrow"
      />
    )
  }

  return (
    <>
      {loansDisplay.map(loan => (
        <DashboardRowLoan
          key={loan.id}
          loan={loan}
          loanId={loan.id}
          isCompleted={loan.isCompleted}
          investorAddress={investorAddress}
        />
      ))}
    </>
  )
}

export const routeDashboardOldLoans = createRoute({
  component: RouteDashboardOldLoans,
})
