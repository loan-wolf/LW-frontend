import * as generated from 'generated'
import * as addresses from './contractAddresses'
import type { ChainAddress } from './utils/ChainAddress'
import { createContractHelpers } from './utils/createContractHelpers'

export const ContractTestDAI = createContractHelpers({
  factory: generated.IERC20__factory,
  chainAddress: addresses.addressTestDAI,
})

export const ContractTestDAI2 = createContractHelpers({
  factory: generated.IERC20__factory,
  chainAddress: addresses.addressTestDAI2,
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

export const ContractBonds = createContractHelpers({
  factory: generated.Bonds__factory,
  chainAddress: addresses.addressBonds,
})

export const ContractLiquidityFarm = createContractHelpers({
  factory: generated.LiquidityFarm__factory,
  chainAddress: addresses.addressLiquidityFarm,
})

export const ContractILiquidityPool = createContractHelpers({
  factory: generated.ILiquidityPool__factory,
  chainAddress: addresses.addressILiquidityPool,
})

export const ContractTrader = createContractHelpers({
  factory: generated.Trader__factory,
  chainAddress: addresses.addressTrader,
})

/**
 * DEPRECATED:
 */
export const getContractLoanWolfPool = (chainAddress: ChainAddress) =>
  createContractHelpers({
    factory: generated.LoanWolfPool__factory,
    chainAddress,
  })

export type ContractLoanWolfPoolType = ReturnType<
  typeof getContractLoanWolfPool
>
