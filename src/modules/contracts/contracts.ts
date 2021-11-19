import { createContractHelpers, Address } from './utils/createContractHelpers'
import * as generated from 'generated'
import * as addresses from './contractAddresses'

export const ContractPoolFactory = createContractHelpers({
  factory: generated.PoolFactory__factory,
  address: addresses.PoolFactory,
})

export const ContractTestDAI = createContractHelpers({
  factory: generated.IERC20__factory,
  address: addresses.TestDAI,
})

export const ContractTestETH = createContractHelpers({
  factory: generated.IERC20__factory,
  address: addresses.TestETH,
})

export const ContractRociCreditToken = createContractHelpers({
  factory: generated.RociCreditToken__factory,
  address: addresses.RociCreditToken,
})

export const ContractCollateralManager = createContractHelpers({
  factory: generated.CollateralManager__factory,
  address: addresses.CollateralManager,
})

export const ContractInvestor = createContractHelpers({
  factory: generated.Investor__factory,
  address: addresses.Investor,
})

export const ContractScoreDB = createContractHelpers({
  factory: generated.ScoreDB__factory,
  address: addresses.ScoreDB,
})

export const ContractPriceFeed = createContractHelpers({
  factory: generated.PriceFeed__factory,
  address: addresses.PriceFeed,
})

export const getContractLoanWolfPool = (address: Address) =>
  createContractHelpers({
    factory: generated.LoanWolfPool__factory,
    address,
  })

export type ContractLoanWolfPoolType = ReturnType<
  typeof getContractLoanWolfPool
>
