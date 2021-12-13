import { memoize, toPairs } from 'lodash'
import { Chains } from 'modules/blockChain/chains'
import { PoolAsset } from '../constants/poolAssets'
import {
  ContractILiquidityPool_DAI_rDAI1,
  ContractILiquidityPool_USDC_rUSDC1,
  ContractILiquidityPool_USDT_rUSDT1,
} from 'modules/contracts/contracts'
import { filterUndef } from 'shared/utils/filterUndef'

export const ILIQUIDITY_POOL_CONTRACTS_MAP = {
  [PoolAsset.DAI]: ContractILiquidityPool_DAI_rDAI1,
  [PoolAsset.USDT]: ContractILiquidityPool_USDT_rUSDT1,
  [PoolAsset.USDC]: ContractILiquidityPool_USDC_rUSDC1,
  [PoolAsset.ETH]: null,
  [PoolAsset.WBTC]: null,
} as const

export const ILIQUIDITY_POOL_CONTRACTS_LIST = filterUndef(
  Object.values(ILIQUIDITY_POOL_CONTRACTS_MAP),
)

// TODO: `useGlobalMemo` hook instead of memoize
// may be more efficient in garbage collecting aspect
export const getILiquidityPoolContractByAsset = memoize((asset: PoolAsset) => {
  const contract = ILIQUIDITY_POOL_CONTRACTS_MAP[asset]
  if (!contract) throw new Error(`No ILiquidityPool contract for ${asset}`)
  return contract
})

export const getILiquidityPoolContractByAddress = memoize(
  (chainId: Chains, address: string) => {
    const contract = ILIQUIDITY_POOL_CONTRACTS_LIST.find(
      c => c.chainAddress.get(chainId) === address,
    )
    if (!contract) throw new Error(`No ILiquidityPool contract for ${address}`)
    return contract
  },
  (...args) => args.join('-'),
)

export const getAssetByPoolAddress = memoize(
  (chainId: Chains, address: string) => {
    const contract = toPairs(ILIQUIDITY_POOL_CONTRACTS_MAP).find(
      ([asset, c]) => c?.chainAddress.get(chainId) === address,
    )
    if (!contract) throw new Error(`No ILiquidityPool contract for ${address}`)
    return contract[0] as PoolAsset
  },
  (...args) => args.join('-'),
)
