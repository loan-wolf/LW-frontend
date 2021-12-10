import * as ethers from 'ethers'

import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'
import { useAssetApr } from 'modules/pools/hooks/useAssetInvestorApr'

import {
  PoolAsset,
  getPoolAssetAddress,
} from 'modules/pools/constants/poolAssets'
import {
  ContractHardcodedCreditScores,
  ContractPriceFeed,
} from 'modules/contracts/contracts'

const HARDCODED_CREDIT_SCORE = 5
const LIQ_THRESHOLD = 80

type Args = {
  amount: number
  borrowedAsset: PoolAsset | ''
  collateralAsset: PoolAsset | ''
  term: number
}

export function useBorrowFormCalcs({
  amount,
  borrowedAsset,
  collateralAsset,
  term,
}: Args) {
  const { chainId } = useWeb3()

  const { data: aprData } = useAssetApr(borrowedAsset)
  const apr = aprData && Number(aprData)

  const amountToBeRepaid = apr && amount + ((apr / 100) * amount * term) / 365

  // const borrowedAddress =
  //   borrowedAsset && getPoolAssetAddress(borrowedAsset, chainId)

  // const { data: borrowedPrice } = ContractPriceFeed.useSwrWeb3(
  //   borrowedAddress ? 'getLatestPriceUSD' : null,
  //   borrowedAddress!,
  // )

  // TODO: Take real credit score when it will be possible
  const { data: ltvWei } = ContractHardcodedCreditScores.useSwrWeb3(
    'LTV',
    HARDCODED_CREDIT_SCORE,
  )
  const ltv = ltvWei && Number(ethers.utils.formatEther(ltvWei))

  const collateralAddress =
    collateralAsset && getPoolAssetAddress(collateralAsset, chainId)

  const { data: collateralPriceData } = ContractPriceFeed.useSwrWeb3(
    collateralAddress ? 'getLatestPriceUSD' : null,
    collateralAddress!,
  )

  const collateralPrice =
    collateralPriceData && Number(ethers.utils.formatEther(collateralPriceData))

  const collateralAmount =
    collateralAsset && collateralPrice && amount && ltv
      ? (amount / collateralPrice / (ltv / 100)).toFixed(18)
      : ''

  const liquidationPrice =
    borrowedAsset && collateralAmount && collateralAsset && collateralPrice
      ? (
          (LIQ_THRESHOLD / 100) *
          Number(collateralAmount) *
          collateralPrice
        ).toFixed(18)
      : ''

  return {
    ltv,
    LIQ_THRESHOLD,
    apr,
    collateralAmount,
    liquidationPrice,
    amountToBeRepaid,
  }
}
