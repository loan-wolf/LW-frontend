import * as ethers from 'ethers'

import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'
import { useAssetApr } from 'modules/pools/hooks/useAssetInvestorApr'

import {
  PoolAsset,
  getPoolAssetAddress,
} from 'modules/pools/constants/poolAssets'
import { ContractPriceFeed } from 'modules/contracts/contracts'

const LTV = 12
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
  const apr = aprData && Number(aprData) / 100

  const amountToBeRepaid = apr && amount + ((apr / 100) * amount * term) / 365

  // const borrowedAddress =
  //   borrowedAsset && getPoolAssetAddress(borrowedAsset, chainId)

  // const { data: borrowedPrice } = ContractPriceFeed.useSwrWeb3(
  //   borrowedAddress ? 'getLatestPriceUSD' : null,
  //   borrowedAddress!,
  // )

  const collateralAddress =
    collateralAsset && getPoolAssetAddress(collateralAsset, chainId)

  const { data: collateralPriceData } = ContractPriceFeed.useSwrWeb3(
    collateralAddress ? 'getLatestPriceUSD' : null,
    collateralAddress!,
  )

  const collateralPrice =
    collateralPriceData && Number(ethers.utils.formatEther(collateralPriceData))

  const collateralAmount =
    collateralAsset && collateralPrice && amount
      ? (amount / collateralPrice / (LTV / 100)).toFixed(18)
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
    LTV,
    LIQ_THRESHOLD,
    apr,
    collateralAmount,
    liquidationPrice,
    amountToBeRepaid,
  }
}
