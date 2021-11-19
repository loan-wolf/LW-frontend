import * as generated from 'generated'
import * as addresses from './contractAddresses'
import type { ChainAddress } from './utils/BunchAddresses'
import { createContractHelpers } from './utils/createContractHelpers'

export const ContractTestDAI = createContractHelpers({
  factory: generated.IERC20__factory,
  chainAddress: addresses.addressTestDAI,
})

export const ContractTestETH = createContractHelpers({
  factory: generated.IERC20__factory,
  chainAddress: addresses.addressTestETH,
})

export const ContractRociCreditToken = createContractHelpers({
  factory: generated.RociCreditToken__factory,
  chainAddress: addresses.addressRociCreditToken,
})

export const ContractCollateralManager = createContractHelpers({
  factory: generated.CollateralManager__factory,
  chainAddress: addresses.addressCollateralManager,
})

export const ContractInvestor = createContractHelpers({
  factory: generated.Investor__factory,
  chainAddress: addresses.addressInvestor,
})

export const ContractScoreDB = createContractHelpers({
  factory: generated.ScoreDB__factory,
  chainAddress: addresses.addressScoreDB,
})

export const ContractPriceFeed = createContractHelpers({
  factory: generated.PriceFeed__factory,
  chainAddress: addresses.addressPriceFeed,
})

export const getContractLoanWolfPool = (chainAddress: ChainAddress) =>
  createContractHelpers({
    factory: generated.LoanWolfPool__factory,
    chainAddress,
  })

export type ContractLoanWolfPoolType = ReturnType<
  typeof getContractLoanWolfPool
>
