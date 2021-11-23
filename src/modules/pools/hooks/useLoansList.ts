import { useSWR } from 'modules/network/hooks/useSwr'
import { useWalletInfo } from 'modules/wallet/hooks/useWalletInfo'
import { useCurrentChain } from 'modules/blockChain/hooks/useCurrentChain'

import { ContractInvestor } from 'modules/contracts/contracts'

export function useLoansList() {
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
          const [loanObj, isCompleted] = await Promise.all([
            contractInvestor.loanLookup(loanId),
            contractInvestor.isComplete(loanId),
          ])
          return {
            id: loanId.toString(),
            isCompleted,
            ...loanObj,
          }
        })

      const res = await Promise.all(requests)

      return res
    },
  )

  return loans
}
