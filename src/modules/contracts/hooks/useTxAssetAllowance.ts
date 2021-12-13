import * as ethers from 'ethers'

import { useCallback } from 'react'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'
import { useTransactionSender } from 'modules/blockChain/hooks/useTransactionSender'
import { useConnectorAssetERC20 } from 'modules/pools/hooks/useConnectorAssetERC20'

import {
  PoolAsset,
  getPoolAssetByAddress,
} from 'modules/pools/constants/poolAssets'
import { logGroup } from 'shared/utils/logGroup'
import * as errors from 'shared/constants/errors'

export function useTxAssetAllowance() {
  const { walletAddress, chainId } = useWeb3()
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

      logGroup('Submitting new allowance', {
        Amount: ethers.utils.formatEther(amountWei),
        'Amount in wei': String(amountWei),
      })

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

      logGroup('Current allowance', {
        Asset: getPoolAssetByAddress(assetContract.address, chainId),
        'Asset address': assetContract.address,
        'Current allowance': ethers.utils.formatEther(allowance),
        'Current allowance in wei': allowance.toString(),
      })

      if (allowance.lt(amountWei)) {
        const txAllowanceRes = await sendAllowance({
          spenderAddress,
          amountWei,
          asset,
        })
        await txAllowanceRes.wait()
      }
    },
    [walletAddress, connectAssetContract, sendAllowance, chainId],
  )

  return {
    makeAllowanceIfNeeded,
    txAllowance,
  }
}
