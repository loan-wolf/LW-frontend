import * as ethers from 'ethers'

import { useCallback } from 'react'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'
import { useTransactionSender } from 'modules/blockChain/hooks/useTransactionSender'
import { useConnectorAssetERC20 } from 'modules/pools/hooks/useConnectorAssetERC20'

import { PoolAsset } from 'modules/pools/constants/poolAssets'
import * as errors from 'shared/constants/errors'

export function useTxAssetAllowance() {
  const { walletAddress } = useWeb3()
  const connectAssetContract = useConnectorAssetERC20()

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
      const assetContract = connectAssetContract(asset)
      const populated = await assetContract.populateTransaction.approve(
        spenderAddress,
        amountWei,
      )

      return populated
    },
    [connectAssetContract],
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

      const assetContract = connectAssetContract(asset)
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
    [walletAddress, connectAssetContract, sendAllowance],
  )

  return {
    makeAllowanceIfNeeded,
    txAllowance,
  }
}
