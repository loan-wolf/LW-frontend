import { useSWR } from 'modules/network/hooks/useSwr'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'

import { ContractInvestor } from 'modules/contracts/contracts'

export function useLoansList() {
  const { chainId, walletAddress } = useWeb3()
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
