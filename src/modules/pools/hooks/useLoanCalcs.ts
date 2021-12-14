import * as ethers from 'ethers'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'

import {
  ContractCollateralManager,
  ContractPriceFeed,
} from 'modules/contracts/contracts'
import { getERCAssetByAddress } from 'modules/pools/constants/poolAssets'
import type { Loan } from '../types/Loan'

const { formatEther } = ethers.utils

type Args = {
  loan: Loan
  loanId: string
  investorAddress: string
}

export function useLoanCalcs({ loan, loanId, investorAddress }: Args) {
  const { chainId } = useWeb3()

  const {
    ERC20Address,
    principal: principalWei,
    interestRate: interestRateWei,
    paymentDueDate,
    paymentPeriod,
  } = loan

  const { data: borrowedAssetPriceWei } = ContractPriceFeed.useSwrWeb3(
    'getLatestPriceUSD',
    ERC20Address,
  )
  const borrowedAsset = getERCAssetByAddress(ERC20Address, chainId)
  const borrowedAssetPrice =
    borrowedAssetPriceWei && Number(formatEther(borrowedAssetPriceWei))

  const loanDate = Number(loan.paymentDueDate) * 1000
  const daysPassed = Math.ceil((Date.now() - loanDate) / 1000 / 3600 / 24)

  // Сейчас в контракте ошибка, это значение должно быть в paymentDueDate, пока будем так
  const maturityTime =
    Number(paymentDueDate) + Number(paymentPeriod) * 24 * 60 * 60

  const apr = Number(formatEther(interestRateWei)) * 12
  const principal = Number(formatEther(principalWei))
  const interest = principal * (apr / 365 / 100) * daysPassed
  const totalDebt = principal + interest
  const totalDebtUSD = borrowedAssetPrice && totalDebt * borrowedAssetPrice

  const { data: collateralInfo } = ContractCollateralManager.useSwrWeb3(
    'getCollateralLookup',
    investorAddress,
    loanId,
  )
  const collateralAsset =
    collateralInfo && getERCAssetByAddress(collateralInfo[0], chainId)
  const collateralAmount =
    collateralInfo && ethers.utils.formatEther(collateralInfo[1])

  return {
    apr,
    principal,
    interest,
    totalDebt,
    totalDebtUSD,
    maturityTime,
    collateralAsset,
    collateralAmount,
    borrowedAsset,
  }
}
