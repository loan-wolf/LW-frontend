import { Chains } from 'modules/blockChain/chains'
import * as generated from 'generated'
import { createContractHelpers } from './utils/createContractHelpers'
import { AddressesMap } from './types'

/**
 * Prices
 */
export const ContractPriceFeed = createContractHelpers({
  name: 'PriceFeed',
  factory: generated.PriceFeed__factory,
  address: {
    [Chains.Kovan]: '0xeB02DcA23dC6E9E691D61286eF791422ca08a90B',
  },
})

/**
 * Tokens
 */
export const ContractTestDAI = createContractHelpers({
  name: 'DAI',
  factory: generated.IERC20__factory,
  address: {
    [Chains.Kovan]: '0xd2B5784b7F0Ff40c010638177744588d33A1F929',
  },
})

export const ContractTestWBTC = createContractHelpers({
  name: 'TestWBTC',
  factory: generated.IERC20__factory,
  address: {
    [Chains.Kovan]: '0x8258aA6ad716800502212e1d3A399693E05acB4A',
  },
})

export const ContractTestUSDT = createContractHelpers({
  name: 'TestUSDT',
  factory: generated.IERC20__factory,
  address: {
    [Chains.Kovan]: '0x5E6d1d6cd912bdB47B821358299e5215648F4318',
  },
})

export const ContractTestUSDC = createContractHelpers({
  name: 'TestUSDC',
  factory: generated.IERC20__factory,
  address: {
    [Chains.Kovan]: '0xC2D2AD1C133C5f9b5c4388Fb0082c4c3777fB3AF',
  },
})

export const ContractTestETH = createContractHelpers({
  name: 'TestETH',
  factory: generated.IERC20__factory,
  address: {
    [Chains.Kovan]: '0xbFBd09C03Eddfd8E3b7b3FdfB65DCd1B95B96A1A',
  },
})

/**
 * NFCS
 */
export const ContractRociCreditToken = createContractHelpers({
  name: 'RociCreditToken',
  factory: generated.RociCreditToken__factory,
  address: {
    [Chains.Kovan]: '0x99d9A66f85bF850a2A603786FA7D817F757aCE66',
  },
})

export const ContractScoreDB = createContractHelpers({
  name: 'ScoreDB',
  factory: generated.ScoreDB__factory,
  address: {
    [Chains.Kovan]: '0x98CB50fF1d5f808a5BfC6286D1a5c7b8a4d8697A',
  },
})

export const ContractHardcodedCreditScores = createContractHelpers({
  name: 'HardcodedCreditScores',
  factory: generated.HardcodedCreditScores__factory,
  address: {
    [Chains.Kovan]: '0x8c844F35fF60842Bb0e6B7807464c4de554D616e',
  },
})

/**
 * Collaterals
 */
export const ContractCollateralManager = createContractHelpers({
  name: 'CollateralManager',
  factory: generated.CollateralManager__factory,
  address: {
    [Chains.Kovan]: '0x72357B381f5258081f473f0B1a5f5cAF135685be',
  },
})

/**
 * Investors
 */
export const ContractInvestor_DAI_rDAI1 = createContractHelpers({
  name: 'Investor_DAI_rDAI1',
  factory: generated.Investor__factory,
  address: {
    [Chains.Kovan]: '0xf047caf9798fe84B12394Cb2cAcc1B82F69Ac8fC',
  },
})

// export const ContractInvestor_DAI_rDAI2 = createContractHelpers({
//   name: 'Investor_DAI_rDAI2',
//   factory: generated.Investor__factory,
//   address: {
//     [Chains.Kovan]: '0xeff0cDf0Fa407A569b6eb85654cc4b307EFcFF17',
//   },
// })

// export const ContractInvestor_DAI_rDAI3 = createContractHelpers({
//   name: 'Investor_DAI_rDAI3',
//   factory: generated.Investor__factory,
//   address: {
//     [Chains.Kovan]: '0xD07D0e1799Fd4319AA0C54aa2CA6d9A6a807739A',
//   },
// })

export const ContractInvestor_USDC_rUSDC1 = createContractHelpers({
  name: 'Investor_USDC_rUSDC1',
  factory: generated.Investor__factory,
  address: {
    [Chains.Kovan]: '0x21FD64054255953d5457Bd04aDE7e60178076Ea4',
  },
})

// export const ContractInvestor_USDC_rUSDC2 = createContractHelpers({
//   name: 'Investor_USDC_rUSDC2',
//   factory: generated.Investor__factory,
//   address: {
//     [Chains.Kovan]: '0xD9d2ed0c15e0931315Fe2da772CF9Ba633d4dEFe',
//   },
// })

// export const ContractInvestor_USDC_rUSDC3 = createContractHelpers({
//   name: 'Investor_USDC_rUSDC3',
//   factory: generated.Investor__factory,
//   address: {
//     [Chains.Kovan]: '0xbdeE439dD6d0236b7D3E15846c4dEbCF2E93a671',
//   },
// })

export const ContractInvestor_USDT_rUSDT1 = createContractHelpers({
  name: 'Investor_USDT_rUSDT1',
  factory: generated.Investor__factory,
  address: {
    [Chains.Kovan]: '0xdE7d4DF0b27730277C1505aA5485d2826CDfebea',
  },
})

// export const ContractInvestor_USDT_rUSDT2 = createContractHelpers({
//   name: 'Investor_USDT_rUSDT2',
//   factory: generated.Investor__factory,
//   address: {
//     [Chains.Kovan]: '0x9276dC6E2337e7130d0c6231b26960254FeAEB8f',
//   },
// })

// export const ContractInvestor_USDT_rUSDT3 = createContractHelpers({
//   name: 'Investor_USDT_rUSDT3',
//   factory: generated.Investor__factory,
//   address: {
//     [Chains.Kovan]: '0x07B3D647CB619aE792577cEE5eA24f45956d761F',
//   },
// })

/**
 * Repayment
 */
export const ContractBonds = createContractHelpers({
  name: 'Bonds',
  factory: generated.Bonds__factory,
  address: {
    [Chains.Kovan]: '0x2CD6F0804aE7F6B188E076DcE5064A0CBFAe5de8',
  },
})

/**
 * Deposit
 */
export const ContractLiquidityFarm = createContractHelpers({
  name: 'LiquidityFarm',
  factory: generated.LiquidityFarm__factory,
  address: {
    [Chains.Kovan]: '0xE1ede12970DBE213D6eE50c6d41DE13f761ACCbb',
  },
})

export const ContractILiquidityPool_DAI_rDAI1 = createContractHelpers({
  name: 'ILiquidityPool_DAI_rDAI1',
  factory: generated.ILiquidityPool__factory,
  address: {
    [Chains.Kovan]: '0x01a928Dc8aCc70bd975F6a3925Aea487a1453971',
  },
})

// export const ContractILiquidityPool_DAI_rDAI2 = createContractHelpers({
//   name: 'ILiquidityPool_DAI_rDAI2',
//   factory: generated.ILiquidityPool__factory,
//   address: {
//     [Chains.Kovan]: '0x46d2CE92b1E4be9c6Bd65D6fae17f70eEf6867f4',
//   },
// })

// export const ContractILiquidityPool_DAI_rDAI3 = createContractHelpers({
//   name: 'ILiquidityPool_DAI_rDAI3',
//   factory: generated.ILiquidityPool__factory,
//   address: {
//     [Chains.Kovan]: '0x7c4692aB399e5c836c92041c30F13368a92E1947',
//   },
// })

export const ContractILiquidityPool_USDT_rUSDT1 = createContractHelpers({
  name: 'ILiquidityPool_USDT_rUSDT1',
  factory: generated.ILiquidityPool__factory,
  address: {
    [Chains.Kovan]: '0x3e5C644f486A3bDD325c9bBd679aAdcE299e0034',
  },
})

// export const ContractILiquidityPool_USDT_rUSDT2 = createContractHelpers({
//   name: 'ILiquidityPool_USDT_rUSDT2',
//   factory: generated.ILiquidityPool__factory,
//   address: {
//     [Chains.Kovan]: '0x5Bc80EA76d82159ebBad0D62fC92091b1d19534a',
//   },
// })

// export const ContractILiquidityPool_USDT_rUSDT3 = createContractHelpers({
//   name: 'ILiquidityPool_USDT_rUSDT3',
//   factory: generated.ILiquidityPool__factory,
//   address: {
//     [Chains.Kovan]: '0x8A98625a4613231bE8ceE1040Af4D963e90e6a4E',
//   },
// })

export const ContractILiquidityPool_USDC_rUSDC1 = createContractHelpers({
  name: 'ILiquidityPool_USDC_rUSDC1',
  factory: generated.ILiquidityPool__factory,
  address: {
    [Chains.Kovan]: '0x623043aa5a65d728790dD61963C9fA5fA27082c7',
  },
})

// export const ContractILiquidityPool_USDC_rUSDC2 = createContractHelpers({
//   name: 'ILiquidityPool_USDC_rUSDC2',
//   factory: generated.ILiquidityPool__factory,
//   address: {
//     [Chains.Kovan]: '0x9d7ea0C27c735ca5696649069048b99103d4c4A4',
//   },
// })

// export const ContractILiquidityPool_USDC_rUSDC3 = createContractHelpers({
//   name: 'ILiquidityPool_USDC_rUSDC3',
//   factory: generated.ILiquidityPool__factory,
//   address: {
//     [Chains.Kovan]: '0xb15b7fd7b53F318Ce62FcCfdFd083782DC16972f',
//   },
// })

export const ContractTrader = createContractHelpers({
  name: 'Trader',
  factory: generated.Trader__factory,
  address: {
    [Chains.Kovan]: '0x663145B52B2fEe131bCD612a54781D12336C3863',
  },
})

/**
 * DEPRECATED:
 */
export const getContractLoanWolfPool = (name: string, address: AddressesMap) =>
  createContractHelpers({
    name,
    factory: generated.LoanWolfPool__factory,
    address,
  })

export type ContractLoanWolfPoolType = ReturnType<
  typeof getContractLoanWolfPool
>
