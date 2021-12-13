import { useSWR } from 'modules/network/hooks/useSwr'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'

import { ContractLiquidityFarm } from 'modules/contracts/contracts'
import {
  getAssetByPoolAddress,
  ILIQUIDITY_POOL_CONTRACTS_LIST,
} from '../utils/getILiquidityPoolContract'
import { getPoolAssetAddress } from '../constants/poolAssets'

export function useDepositsList() {
  const { chainId, library, walletAddress } = useWeb3()
  const contractLiquidityFarm = ContractLiquidityFarm.useContractWeb3()

  const deposits = useSWR(`deposits-${chainId}-${walletAddress}`, async () => {
    const pools = ILIQUIDITY_POOL_CONTRACTS_LIST.map(c =>
      c.connectWeb3({ chainId, library }),
    )

    const requestsPools = pools.map(async pool => {
      const poolAddress = pool.address
      const deposit = await contractLiquidityFarm.getStakeInfo(
        poolAddress,
        walletAddress!,
      )
      const asset = getAssetByPoolAddress(chainId, poolAddress)
      const assetAddress = getPoolAssetAddress(asset, chainId)
      return {
        deposit,
        poolAddress,
        assetAddress,
      }
    })

    const responses = await Promise.all(requestsPools)
    const flattened = responses.flat()
    return flattened
  })

  return deposits
}
