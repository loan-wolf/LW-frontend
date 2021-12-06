import { Chains } from 'modules/blockChain/chains'
import { ChainAddress } from './utils/ChainAddress'

export const addressTestDAI = new ChainAddress('TestDAI', {
  [Chains.Kovan]: '0x6b198422c97a805701a1cB53fee51F864f825dDA',
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
  [Chains.Kovan]: '0xACC042d62E869d69eEa6FBC8C5613414421E6d21',
})

export const addressScoreDB = new ChainAddress('ScoreDB', {
  [Chains.Kovan]: '0x98CB50fF1d5f808a5BfC6286D1a5c7b8a4d8697A',
})

export const addressInvestor = new ChainAddress('Investor', {
  [Chains.Kovan]: '0x4D1E6ffe0897B1d92cce3fEE6ab423B4193fB98e',
})

export const addressPriceFeed = new ChainAddress('PriceFeed', {
  [Chains.Kovan]: '0xeB02DcA23dC6E9E691D61286eF791422ca08a90B',
})

export const addressBonds = new ChainAddress('Bonds', {
  [Chains.Kovan]: '0x54935e2E07f61DbF0F95512a5f3f31a205E3A24D',
})

export const addressLiquidityFarm = new ChainAddress('LiquidityFarm', {
  [Chains.Kovan]: '0x2A7Fa210e2254e2a0b3732171e97686Ee2f3D8Df',
})

export const addressILiquidityPool = new ChainAddress('ILiquidityPool', {
  [Chains.Kovan]: '0x01a928Dc8aCc70bd975F6a3925Aea487a1453971',
})

export const addressTrader = new ChainAddress('Trader', {
  [Chains.Kovan]: '0xED96578D8AbefDfeBEBcF03D7F1c15Dd5b3A240c',
})
