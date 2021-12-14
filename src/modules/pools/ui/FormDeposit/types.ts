import type { ContractTransaction } from 'ethers'
import type { PoolAsset } from 'modules/pools/constants/poolAssets'
import type { PoolRisk } from 'modules/pools/constants/PoolRisk'

export type FormValues = {
  depositedAsset: PoolAsset | ''
  amount: string
  targetRiskPool: PoolRisk | ''
}

export type SuccessData = {
  tx: ContractTransaction
  formValues: FormValues
}
