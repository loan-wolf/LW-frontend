import { memoize } from 'lodash'
import { Chains } from 'modules/blockChain/chains'
import { PoolAsset } from '../constants/poolAssets'
import {
  ContractILiquidityPool_DAI_rDAI1,
  ContractILiquidityPool_DAI_rDAI2,
  ContractILiquidityPool_DAI_rDAI3,
  ContractILiquidityPool_USDC_rUSDC1,
  ContractILiquidityPool_USDC_rUSDC2,
  ContractILiquidityPool_USDC_rUSDC3,
  ContractILiquidityPool_USDT_rUSDT1,
  ContractILiquidityPool_USDT_rUSDT2,
  ContractILiquidityPool_USDT_rUSDT3,
} from 'modules/contracts/contracts'
import { PoolRisk } from '../constants/PoolRisk'

export const ILIQUIDITY_POOL_COLLECTION = [
  // DAI
  {
    asset: PoolAsset.DAI,
    risk: PoolRisk.LOW,
    contract: ContractILiquidityPool_DAI_rDAI1,
  },
  {
    asset: PoolAsset.DAI,
    risk: PoolRisk.MIDDLE,
    contract: ContractILiquidityPool_DAI_rDAI2,
  },
  {
    asset: PoolAsset.DAI,
    risk: PoolRisk.HIGH,
    contract: ContractILiquidityPool_DAI_rDAI3,
  },

  // USDT
  {
    asset: PoolAsset.USDT,
    risk: PoolRisk.LOW,
    contract: ContractILiquidityPool_USDT_rUSDT1,
  },
  {
    asset: PoolAsset.USDT,
    risk: PoolRisk.MIDDLE,
    contract: ContractILiquidityPool_USDT_rUSDT2,
  },
  {
    asset: PoolAsset.USDT,
    risk: PoolRisk.HIGH,
    contract: ContractILiquidityPool_USDT_rUSDT3,
  },

  // USDC
  {
    asset: PoolAsset.USDC,
    risk: PoolRisk.LOW,
    contract: ContractILiquidityPool_USDC_rUSDC1,
  },
  {
    asset: PoolAsset.USDC,
    risk: PoolRisk.MIDDLE,
    contract: ContractILiquidityPool_USDC_rUSDC2,
  },
  {
    asset: PoolAsset.USDC,
    risk: PoolRisk.HIGH,
    contract: ContractILiquidityPool_USDC_rUSDC3,
  },
] as const

const getError = (e: string) => `No ILiquidityPool contract for ${e}`

export const getILiquidityPoolByAssetAndRisk = memoize(
  (asset: PoolAsset, risk: PoolRisk) => {
    const item = ILIQUIDITY_POOL_COLLECTION.find(
      i => i.asset === asset && i.risk === risk,
    )
    if (!item) throw new Error(getError(asset))
    return item
  },
  (...args) => args.join('-'),
)

export const getILiquidityPoolByAddress = memoize(
  (chainId: Chains, address: string) => {
    const item = ILIQUIDITY_POOL_COLLECTION.find(
      i => i.contract.chainAddress.get(chainId) === address,
    )
    if (!item) throw new Error(getError(address))
    return item
  },
  (...args) => args.join('-'),
)
