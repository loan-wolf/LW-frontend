import { useSWR } from 'modules/network/hooks/useSwr'
import { useWalletInfo } from 'modules/wallet/hooks/useWalletInfo'
import { useCurrentChain } from 'modules/blockChain/hooks/useCurrentChain'

import {
  ContractInvestor,
  ContractCollateralManager,
} from 'modules/contracts/contracts'

export function useCollateralList() {
  const chainId = useCurrentChain()
  const { walletAddress } = useWalletInfo()
  const contractInvestor = ContractInvestor.useContractWeb3()
  const contractCollateralManager = ContractCollateralManager.useContractWeb3()
  const investorAddress = contractInvestor.address

  const loans = useSWR(
    walletAddress
      ? `collaterals-${chainId}-${investorAddress}-${walletAddress}`
      : null,
    async () => {
      if (!walletAddress) return

      const loansCount = await contractInvestor.getNumberOfLoans(walletAddress)

      const requests = Array.from(Array(Number(loansCount)))
        .map((_, i) => i)
        .reverse()
        .map(async i => {
          const loanId = await contractInvestor.loanIDs(walletAddress, i)
          const collateral =
            await contractCollateralManager.getCollateralLookup(
              investorAddress,
              loanId,
            )
          return {
            loanId,
            collateral,
          }
        })

      const res = await Promise.all(requests)

      return res
    },
  )

  return loans
}
