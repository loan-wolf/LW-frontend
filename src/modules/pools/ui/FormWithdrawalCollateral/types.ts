import type { ContractTransaction } from 'ethers'
import type { FormValues } from '../FormWithdrawalAbstract/types'

export * from '../FormWithdrawalAbstract/types'

export type SuccessData = {
  tx: ContractTransaction
  formValues: FormValues
}
