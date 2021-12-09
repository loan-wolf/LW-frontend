import * as ethers from 'ethers'
import { useSWR } from 'modules/network/hooks/useSwr'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'
import { getInvestorContractByAsset } from '../utils/getInvestorContractByAsset'
import type { PoolAsset } from '../constants/poolAssets'

export function useAssetApr(asset: PoolAsset | '') {
  const { chainId, library } = useWeb3()

  const data = useSWR(
    asset ? `asset-investor-apr-${asset}` : null,
    async () => {
      if (!asset) return null
      const Contract = getInvestorContractByAsset(asset)
      const contract = Contract.connectWeb3({ chainId, library })
      const apr = await contract.interestRateAnnual()
      return Number(ethers.utils.formatEther(apr))
    },
  )

  return data
}
