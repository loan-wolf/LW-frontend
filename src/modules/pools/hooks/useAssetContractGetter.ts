import { useCallback } from 'react'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'
import { useCurrentChain } from 'modules/blockChain/hooks/useCurrentChain'

import {
  PoolAsset,
  getPoolAssetContract,
} from 'modules/pools/constants/poolAssets'

export function useAssetContractGetter() {
  const { library } = useWeb3()
  const chainId = useCurrentChain()

  const getAssetContract = useCallback(
    (asset: PoolAsset) => {
      if (!library) throw new Error('Library not defined')
      const CollateralAssetContract = getPoolAssetContract(asset)
      const collateralAssetContract = CollateralAssetContract.connectWeb3({
        chainId,
        library: library.getSigner(),
      })
      return collateralAssetContract
    },
    [chainId, library],
  )

  return getAssetContract
}
