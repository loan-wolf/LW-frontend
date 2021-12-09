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

const COLLATERAL_PRICE = {
  [PoolAsset.DAI]: 1,
  [PoolAsset.USDC]: 1,
  [PoolAsset.USDT]: 1,
  [PoolAsset.ETH]: 4300,
  [PoolAsset.WBTC]: 1,
}

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

  const collateralAmountNum =
    collateralAsset && amount
      ? amount / COLLATERAL_PRICE[collateralAsset] / (LTV / 100)
      : undefined

  const collateralAmount = collateralAmountNum
    ? collateralAmountNum.toFixed(18)
    : ''

  const liquidationPrice =
    borrowedAsset && collateralAmountNum && collateralAsset
      ? (
          (LIQ_THRESHOLD / 100) *
          collateralAmountNum *
          COLLATERAL_PRICE[collateralAsset]
        ).toFixed(4)
      : ''

  const { data: aprData } = useAssetApr(borrowedAsset)
  const apr = aprData && Number(aprData) / 100

  const amountToBeRepaid = apr && amount + ((apr / 100) * amount * term) / 365

  const borrowedAddress =
    borrowedAsset && getPoolAssetAddress(borrowedAsset, chainId)

  const { data: borrowedPrice } = ContractPriceFeed.useSwrWeb3(
    borrowedAddress ? 'getLatestPriceUSD' : null,
    borrowedAddress!,
  )

  const collateralAddress =
    collateralAsset && getPoolAssetAddress(collateralAsset, chainId)

  const { data: collateralPrice } = ContractPriceFeed.useSwrWeb3(
    collateralAddress ? 'getLatestPriceUSD' : null,
    collateralAddress!,
  )

  // TODO: Use this numbers in calculations when contract will be fixed
  console.log(
    borrowedPrice && ethers.utils.formatEther(borrowedPrice),
    collateralPrice && ethers.utils.formatEther(collateralPrice),
  )

  return {
    LTV,
    LIQ_THRESHOLD,
    apr,
    collateralAmount,
    liquidationPrice,
    amountToBeRepaid,
  }
}
