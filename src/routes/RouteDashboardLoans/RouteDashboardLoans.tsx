import { useSWR } from 'modules/network/hooks/useSwr'
import { useWalletInfo } from 'modules/wallet/hooks/useWalletInfo'
import { useCurrentChain } from 'modules/blockChain/hooks/useCurrentChain'

import { DashboardRowLoan } from 'modules/pools/ui/DashboardRowLoan'
import { PageLoader } from 'shared/ui/layout/PageLoader'

import { ContractInvestor } from 'modules/contracts/contracts'
import { createRoute } from 'modules/router/utils/createRoute'

function RouteDashboardLoans() {
  const chainId = useCurrentChain()
  const { walletAddress } = useWalletInfo()
  const contractInvestor = ContractInvestor.useContractWeb3()

  const loans = useSWR(
    walletAddress ? `loans-${chainId}-${walletAddress}` : null,
    async () => {
      if (!walletAddress) return

      const loansCount = await contractInvestor.getNumberOfLoans(walletAddress)

      const requests = Array.from(Array(Number(loansCount)))
        .map((_, i) => i)
        .reverse()
        .map(async i => {
          const loanId = await contractInvestor.loanIDs(walletAddress, i)
          const loanObj = await contractInvestor.loanLookup(loanId)
          return { id: String(loanId), ...loanObj }
        })

      const res = await Promise.all(requests)

      return res
    },
  )

  if (loans.isLoading) {
    return <PageLoader />
  }

  if (!loans.data || loans.data.length === 0) {
  }

  return (
    <>
      {loans.data?.map(loan => (
        <DashboardRowLoan
          key={loan.id}
          loan={loan}
          loanId={loan.id}
          investorAddress={contractInvestor.address}
        />
      ))}
    </>
  )
}

export const routeDashboardLoans = createRoute({
  component: RouteDashboardLoans,
})
