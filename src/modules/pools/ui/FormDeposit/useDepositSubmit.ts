import * as ethers from 'ethers'

import { useCallback, useState } from 'react'
import { useWalletInfo } from 'modules/wallet/hooks/useWalletInfo'
import { useCurrentChain } from 'modules/blockChain/hooks/useCurrentChain'
import { useTransactionSender } from 'modules/blockChain/hooks/useTransactionSender'
import { useTxAssetAllowance } from 'modules/contracts/hooks/useTxAssetAllowance'

import { getPoolAssetAddress } from 'modules/pools/constants/poolAssets'
import {
  ContractTrader,
  ContractLiquidityFarm,
  ContractILiquidityPool,
} from 'modules/contracts/contracts'
import type { FormValues, SuccessData } from './types'
import * as errors from 'shared/constants/errors'

type Args = {
  isLocked: boolean
  setLocked: (isLocked: boolean) => void
  onSuccess: (successData: SuccessData) => void
}

export function useDepositSubmit({ isLocked, setLocked, onSuccess }: Args) {
  const chainId = useCurrentChain()
  const { walletAddress } = useWalletInfo()
  const contractFarm = ContractLiquidityFarm.useContractWeb3()
  const [isSubmitting, setSubmitting] = useState(false)
  const { makeAllowanceIfNeeded, txAllowance } = useTxAssetAllowance()

  /**
   * Deposit tx
   */
  const populateDeposit = useCallback(
    async ({ amountWei }: { amountWei: ethers.BigNumberish }) => {
      const poolAddress = ContractILiquidityPool.chainAddress.get(chainId)
      const populated = await contractFarm.populateTransaction.depositZap(
        poolAddress,
        amountWei,
        {
          gasLimit: 1000000,
        },
      )

      return populated
    },
    [chainId, contractFarm],
  )
  const txDeposit = useTransactionSender(populateDeposit)

  const { send: sendDeposit } = txDeposit

  const submit = useCallback(
    async (formValues: FormValues) => {
      if (!isLocked) {
        setLocked(true)
      } else {
        try {
          const { amount, depositedAsset } = formValues
          if (!walletAddress) throw new Error(errors.connectWallet)
          if (!depositedAsset) throw new Error(errors.depositAssetNotSelected)
          const assetAddress = getPoolAssetAddress(depositedAsset, chainId)
          if (!assetAddress) throw new Error(errors.assetAddressNotDefined)

          setSubmitting(true)

          const amountWei = ethers.utils.parseEther(amount)

          await makeAllowanceIfNeeded({
            spenderAddress: ContractTrader.chainAddress.get(chainId),
            amountWei,
            asset: depositedAsset,
          })

          console.log(amountWei)

          const txDepositRes = await sendDeposit({
            amountWei,
          })

          setSubmitting(false)
          onSuccess({ tx: txDepositRes, formValues })
        } catch (err) {
          setSubmitting(false)
          throw err
        }
      }
    },
    [
      isLocked,
      setLocked,
      walletAddress,
      chainId,
      makeAllowanceIfNeeded,
      sendDeposit,
      onSuccess,
    ],
  )

  return {
    submit,
    txAllowance,
    txDeposit,
    isSubmitting,
  }
}
