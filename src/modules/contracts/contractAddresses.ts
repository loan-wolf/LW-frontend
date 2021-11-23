import { Chains } from 'modules/blockChain/chains'
import { ChainAddress } from './utils/ChainAddress'

export const addressTestDAI = new ChainAddress('TestDAI', {
  [Chains.Kovan]: '0x6b198422c97a805701a1cB53fee51F864f825dDA',
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
  [Chains.Kovan]: '0x97395ae460dcB8941Cf8d47DFaaDB729a974820E',
})

export const addressBonds = new ChainAddress('Bonds', {
  [Chains.Kovan]: '0x54935e2E07f61DbF0F95512a5f3f31a205E3A24D',
})
