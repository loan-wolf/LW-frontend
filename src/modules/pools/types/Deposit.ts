import type { LiquidityFarm } from 'generated'
import type { UnpackedPromise } from 'shared/utils/utilTypes'

export type Deposit = UnpackedPromise<ReturnType<LiquidityFarm['getStakeInfo']>>
