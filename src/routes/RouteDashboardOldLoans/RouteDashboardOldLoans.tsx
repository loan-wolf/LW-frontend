import { useMemo } from 'react'
import { useLoansList } from 'modules/pools/hooks/useLoansList'

import { PageLoader } from 'shared/ui/layout/PageLoader'
import { DashboardRowLoan } from 'modules/pools/ui/DashboardRowLoan'
import { DashboardEmptyCTA } from 'modules/pools/ui/DashboardEmptyCTA'

import { createRoute } from 'modules/router/utils/createRoute'
import * as links from 'modules/router/links'

function RouteDashboardOldLoans() {
  const loans = useLoansList()

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
      {loansDisplay.map(loanData => (
        <DashboardRowLoan
          key={loanData.id}
          loan={loanData.loan}
          loanId={loanData.id}
          isCompleted={loanData.isCompleted}
          investorAddress={loanData.investorAddress}
        />
      ))}
    </>
  )
}

export const routeDashboardOldLoans = createRoute({
  component: RouteDashboardOldLoans,
})
