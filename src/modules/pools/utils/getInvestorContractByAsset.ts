import { memoize } from 'lodash'
import { PoolAsset } from '../constants/poolAssets'
import {
  ContractInvestor_DAI_rDAI1,
  ContractInvestor_USDT_rUSDT1,
  ContractInvestor_USDC_rUSDC1,
} from 'modules/contracts/contracts'

const INVESTORS_MAP = {
  [PoolAsset.DAI]: ContractInvestor_DAI_rDAI1,
  [PoolAsset.USDT]: ContractInvestor_USDT_rUSDT1,
  [PoolAsset.USDC]: ContractInvestor_USDC_rUSDC1,
  [PoolAsset.ETH]: null,
  [PoolAsset.WBTC]: null,
} as const

// TODO: `useGlobalMemo` hook instead of memoize
// may be more efficient in garbage collecting aspect
export const getInvestorContractByAsset = memoize((asset: PoolAsset) => {
  const contract = INVESTORS_MAP[asset]
  if (!contract) throw new Error(`No investor contract for ${asset}`)
  return contract
})
