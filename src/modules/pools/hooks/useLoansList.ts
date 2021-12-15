import { useSWR } from 'modules/network/hooks/useSwr'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'

import { INVESTORS_MAP_LIST } from '../utils/getInvestorContract'

export function useLoansList() {
  const { chainId, walletAddress, library } = useWeb3()

  const loans = useSWR(
    walletAddress ? `loans-${chainId}-${walletAddress}` : null,
    async () => {
      if (!walletAddress || !library) return

      const investors = INVESTORS_MAP_LIST.map(c =>
        c.connectWeb3({ chainId, library }),
      )

      const requestsInvestors = investors.map(async investor => {
        const loansCount = await investor.getNumberOfLoans(walletAddress)
        const requestsLoans = Array.from(Array(Number(loansCount)))
          .map((_, i) => i)
          .reverse()
          .map(async i => {
            const loanId = await investor.loanIDs(walletAddress, i)
            const [loan, isCompleted] = await Promise.all([
              investor.loanLookup(loanId),
              investor.isComplete(loanId),
            ])
            return {
              id: loanId.toString(),
              isCompleted,
              investorAddress: investor.address,
              loan,
            }
          })
        const res = await Promise.all(requestsLoans)
        return res
      })

      const responses = await Promise.all(requestsInvestors)
      const flattened = responses.flat()
      return flattened
    },
  )

  return loans
}
