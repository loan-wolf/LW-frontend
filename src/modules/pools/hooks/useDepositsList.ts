import { useSWR } from 'modules/network/hooks/useSwr'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'

import { ContractLiquidityFarm } from 'modules/contracts/contracts'
import {
  getILiquidityPoolByAddress,
  ILIQUIDITY_POOL_COLLECTION,
} from '../utils/getILiquidityPoolContract'
import { getERCAssetAddress } from '../constants/poolAssets'

export function useDepositsList() {
  const { chainId, walletAddress } = useWeb3()
  const contractLiquidityFarm = ContractLiquidityFarm.useContractWeb3()

  const deposits = useSWR(`deposits-${chainId}-${walletAddress}`, async () => {
    const requestsPools = ILIQUIDITY_POOL_COLLECTION.map(async pool => {
      const poolAddress = pool.contract.chainAddress.get(chainId)
      const [[rewardToken, apy], deposit] = await Promise.all([
        contractLiquidityFarm.getPoolInfo(poolAddress),
        contractLiquidityFarm.getStakeInfo(poolAddress, walletAddress!),
      ])
      const { asset } = getILiquidityPoolByAddress(chainId, poolAddress)
      const assetAddress = getERCAssetAddress(asset, chainId)
      return {
        apy,
        rewardToken,
        risk: pool.risk,
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
