import { ContractTransaction } from '@ethersproject/contracts'

export type TxStatus = 'empty' | 'signing' | 'pending' | 'failed' | 'success'

export type ResultTx = ContractTransaction
