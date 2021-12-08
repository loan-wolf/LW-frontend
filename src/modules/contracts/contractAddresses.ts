import { Chains } from 'modules/blockChain/chains'
import { ChainAddress } from './utils/ChainAddress'

export const addressTestDAI = new ChainAddress('TestDAI', {
  [Chains.Kovan]: '0xd2B5784b7F0Ff40c010638177744588d33A1F929',
})

export const addressTestDAI2 = new ChainAddress('TestDAI2', {
  [Chains.Kovan]: '0xd2B5784b7F0Ff40c010638177744588d33A1F929',
})

export const addressTestETH = new ChainAddress('TestETH', {
  [Chains.Kovan]: '0xbFBd09C03Eddfd8E3b7b3FdfB65DCd1B95B96A1A',
})

export const addressRociCreditToken = new ChainAddress('RociCreditToken', {
  [Chains.Kovan]: '0x99d9A66f85bF850a2A603786FA7D817F757aCE66',
})

export const addressCollateralManager = new ChainAddress('CollateralManager', {
  [Chains.Kovan]: '0x72357B381f5258081f473f0B1a5f5cAF135685be',
})

export const addressScoreDB = new ChainAddress('ScoreDB', {
  [Chains.Kovan]: '0x98CB50fF1d5f808a5BfC6286D1a5c7b8a4d8697A',
})

export const addressInvestor = new ChainAddress('Investor', {
  [Chains.Kovan]: '0x948d2361F651E3554A62e9D334d3a95482d54D0B',
})

export const addressPriceFeed = new ChainAddress('PriceFeed', {
  [Chains.Kovan]: '0x4c8C54c081645Cd2453Ec4880FE1916F73A13a50',
})

export const addressBonds = new ChainAddress('Bonds', {
  [Chains.Kovan]: '0x2CD6F0804aE7F6B188E076DcE5064A0CBFAe5de8',
})

export const addressLiquidityFarm = new ChainAddress('LiquidityFarm', {
  [Chains.Kovan]: '0xE1ede12970DBE213D6eE50c6d41DE13f761ACCbb',
})

export const addressILiquidityPool = new ChainAddress('ILiquidityPool', {
  [Chains.Kovan]: '0x01a928Dc8aCc70bd975F6a3925Aea487a1453971',
})

export const addressTrader = new ChainAddress('Trader', {
  [Chains.Kovan]: '0x663145B52B2fEe131bCD612a54781D12336C3863',
})
