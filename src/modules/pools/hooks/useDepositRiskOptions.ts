import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'
import { ContractLiquidityFarm } from 'modules/contracts/contracts'
import { useSWR } from 'modules/network/hooks/useSwr'
import { PoolAsset } from '../constants/poolAssets'
import { getRiskOption } from '../constants/PoolRisk'
import { ILIQUIDITY_POOL_COLLECTION } from '../utils/getILiquidityPoolContract'

export function useDepositRiskOptions(asset: PoolAsset | '' | undefined) {
  const { chainId } = useWeb3()
  const contractLiquidityFarm = ContractLiquidityFarm.useContractWeb3()

  const options = useSWR(
    asset ? `deposit-risk-options-${asset}` : null,
    async () => {
      if (!asset) return []
      const pools = ILIQUIDITY_POOL_COLLECTION.filter(i => i.asset === asset)
      const requests = pools.map(async i => {
        const poolAddress = i.contract.chainAddress.get(chainId)
        const [, apy] = await contractLiquidityFarm.getPoolInfo(poolAddress)
        return getRiskOption(i.risk, Number(apy) / 100)
      })
      const responses = await Promise.all(requests)
      return responses
    },
  )

  return options
}
