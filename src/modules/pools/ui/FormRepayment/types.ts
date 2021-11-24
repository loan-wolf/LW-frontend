import type { ContractTransaction } from 'ethers'
import type { PoolAsset } from 'modules/pools/constants/poolAssets'

export type FormValues = {
  depositedAsset: PoolAsset | ''
  amount: string
  returnCollateral: boolean
  collateralAmount: string
}

export type SuccessData = {
  tx: ContractTransaction
  formValues: FormValues
}
