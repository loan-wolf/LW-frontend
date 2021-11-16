import { createContractHelpers, Address } from './utils/createContractHelpers'
import * as generated from 'generated'
import * as addresses from './contractAddresses'

export const ContractPoolFactory = createContractHelpers({
  factory: generated.PoolFactory__factory,
  address: addresses.PoolFactory,
})

export const ContractTestDai = createContractHelpers({
  factory: generated.TestDai__factory,
  address: addresses.TestDai,
})

export const ContractTestUsdt = createContractHelpers({
  factory: generated.TestUsdt__factory,
  address: addresses.TestUsdt,
})

export const ContractRociCreditToken = createContractHelpers({
  factory: generated.RociCreditToken__factory,
  address: addresses.RociCreditToken,
})

export const ContractInvestor = createContractHelpers({
  factory: generated.Investor__factory,
  address: addresses.Investor,
})

export const getContractLoanWolfPool = (address: Address) =>
  createContractHelpers({
    factory: generated.LoanWolfPool__factory,
    address,
  })

export type ContractLoanWolfPoolType = ReturnType<
  typeof getContractLoanWolfPool
>
