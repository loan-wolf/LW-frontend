import { PoolAsset } from '../constants/poolAssets'

export function assetOrUndef(test: string | undefined) {
  return Object.values(PoolAsset).includes(test as any)
    ? (test as PoolAsset)
    : undefined
}
