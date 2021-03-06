import { useCallback } from 'react'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'

import {
  PoolAsset,
  getERCContractByAsset,
} from 'modules/pools/constants/poolAssets'

export function useConnectorAssetERC20() {
  const { library, chainId } = useWeb3()

  const getAssetContract = useCallback(
    (asset: PoolAsset) => {
      if (!library) throw new Error('Library not defined')
      const CollateralAssetContract = getERCContractByAsset(asset)
      const collateralAssetContract = CollateralAssetContract.connectWeb3({
        chainId,
        library,
      })
      return collateralAssetContract
    },
    [chainId, library],
  )

  return getAssetContract
}
