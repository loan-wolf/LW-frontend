import { useCallback } from 'react'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'
import { getInvestorContractByAsset } from 'modules/pools/utils/getInvestorContract'
import { PoolAsset } from 'modules/pools/constants/poolAssets'

export function useConnectorInvestor() {
  const { chainId, library } = useWeb3()
  const getInvestorContract = useCallback(
    (asset: PoolAsset) => {
      const ContractInvestor = getInvestorContractByAsset(asset)
      const connected = ContractInvestor.connectWeb3({ chainId, library })
      return connected
    },
    [chainId, library],
  )
  return getInvestorContract
}
