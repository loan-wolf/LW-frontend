import * as ethers from 'ethers'

import { useCallback } from 'react'
import { useWalletInfo } from 'modules/wallet/hooks/useWalletInfo'
import { useTransactionSender } from 'modules/blockChain/hooks/useTransactionSender'
import { useAssetContractGetter } from 'modules/pools/hooks/useAssetContractGetter'

import { PoolAsset } from 'modules/pools/constants/poolAssets'
import * as errors from 'shared/constants/errors'

export function useTxAssetAllowance() {
  const { walletAddress } = useWalletInfo()
  const getAssetContract = useAssetContractGetter()

  const populateAllowance = useCallback(
    async ({
      spenderAddress,
      amountWei,
      asset,
    }: {
      spenderAddress: string
      amountWei: ethers.BigNumberish
      asset: PoolAsset
    }) => {
      const assetContract = getAssetContract(asset)
      const populated = await assetContract.populateTransaction.approve(
        spenderAddress,
        amountWei,
      )

      return populated
    },
    [getAssetContract],
  )
  const txAllowance = useTransactionSender(populateAllowance)

  const { send: sendAllowance } = txAllowance

  const makeAllowanceIfNeeded = useCallback(
    async ({
      spenderAddress,
      amountWei,
      asset,
    }: {
      spenderAddress: string
      amountWei: ethers.BigNumberish
      asset: PoolAsset
    }) => {
      if (!walletAddress) throw new Error(errors.connectWallet)

      const assetContract = getAssetContract(asset)
      const allowance = await assetContract.allowance(
        walletAddress,
        spenderAddress,
      )

      if (allowance.lt(amountWei)) {
        const txAllowanceRes = await sendAllowance({
          spenderAddress,
          amountWei,
          asset,
        })
        await txAllowanceRes.wait()
      }
    },
    [walletAddress, getAssetContract, sendAllowance],
  )

  return {
    makeAllowanceIfNeeded,
    txAllowance,
  }
}
