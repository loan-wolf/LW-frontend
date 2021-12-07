import type { PoolAsset } from 'modules/pools/constants/poolAssets'

export type FormValues = {
  asset: PoolAsset
  amount: string
  risk: string
}
