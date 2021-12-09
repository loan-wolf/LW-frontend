import { useSWR } from 'modules/network/hooks/useSwr'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'

import {
  ContractInvestor_DAI_rDAI1,
  ContractInvestor_USDC_rUSDC1,
  ContractInvestor_USDT_rUSDT1,
  ContractCollateralManager,
} from 'modules/contracts/contracts'

export function useCollateralList() {
  const { chainId, library, walletAddress } = useWeb3()

  const contractCollateralManager = ContractCollateralManager.useContractWeb3()
  // const investorAddress = contractInvestor.address

  const loans = useSWR(
    walletAddress ? `collaterals-${chainId}-${walletAddress}` : null,
    async () => {
      if (!walletAddress || !library) return

      const investors = [
        ContractInvestor_DAI_rDAI1.connectWeb3({ chainId, library }),
        ContractInvestor_USDC_rUSDC1.connectWeb3({ chainId, library }),
        ContractInvestor_USDT_rUSDT1.connectWeb3({ chainId, library }),
      ]

      const requestsInvestors = investors.map(async investor => {
        const loansCount = await investor.getNumberOfLoans(walletAddress)
        const requests = Array.from(Array(Number(loansCount)))
          .map((_, i) => i)
          .reverse()
          .map(async i => {
            const loanId = await investor.loanIDs(walletAddress, i)
            const collateral =
              await contractCollateralManager.getCollateralLookup(
                investor.address,
                loanId,
              )
            return {
              loanId,
              collateral,
            }
          })
        const res = await Promise.all(requests)
        return res
      })

      const responses = await Promise.all(requestsInvestors)
      const flattened = responses.flat()
      return flattened
    },
  )

  return loans
}
