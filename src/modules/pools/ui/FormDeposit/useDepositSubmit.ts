import * as ethers from 'ethers'

import { useCallback, useState } from 'react'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'
import { useTransactionSender } from 'modules/blockChain/hooks/useTransactionSender'
import { useTxAssetAllowance } from 'modules/contracts/hooks/useTxAssetAllowance'

import {
  getERCAssetAddress,
  PoolAsset,
} from 'modules/pools/constants/poolAssets'
import {
  ContractTrader,
  ContractLiquidityFarm,
} from 'modules/contracts/contracts'
import type { FormValues, SuccessData } from './types'
import { logGroup } from 'shared/utils/logGroup'
import { PoolRisk } from 'modules/pools/constants/PoolRisk'
import { getILiquidityPoolByAssetAndRisk } from 'modules/pools/utils/getILiquidityPoolContract'
import * as errors from 'shared/constants/errors'

type Args = {
  isLocked: boolean
  setLocked: (isLocked: boolean) => void
  onSuccess: (successData: SuccessData) => void
}

export function useDepositSubmit({ isLocked, setLocked, onSuccess }: Args) {
  const { chainId, walletAddress } = useWeb3()
  const contractFarm = ContractLiquidityFarm.useContractWeb3()
  const [isSubmitting, setSubmitting] = useState(false)
  const { makeAllowanceIfNeeded, txAllowance } = useTxAssetAllowance()

  /**
   * Deposit tx
   */
  const populateDeposit = useCallback(
    async ({
      depositedAsset,
      amountWei,
      risk,
    }: {
      depositedAsset: PoolAsset
      amountWei: ethers.BigNumberish
      risk: PoolRisk
    }) => {
      const { contract: PoolContract } = getILiquidityPoolByAssetAndRisk(
        depositedAsset,
        risk,
      )
      const poolAddress = PoolContract.chainAddress.get(chainId)

      logGroup('Submitting deposit', {
        'Pool address': poolAddress,
        Amount: ethers.utils.formatEther(amountWei),
        'Amount in wei': amountWei.toString(),
      })

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
          const { amount, depositedAsset, targetRiskPool } = formValues
          if (!walletAddress) throw new Error(errors.connectWallet)
          if (!depositedAsset) throw new Error(errors.depositAssetNotSelected)
          if (!targetRiskPool) throw new Error(errors.riskNotSelected)
          const assetAddress = getERCAssetAddress(depositedAsset, chainId)
          if (!assetAddress) throw new Error(errors.assetAddressNotDefined)

          setSubmitting(true)

          const amountWei = ethers.utils.parseEther(amount)

          await makeAllowanceIfNeeded({
            spenderAddress: ContractTrader.chainAddress.get(chainId),
            amountWei,
            asset: depositedAsset,
          })

          const txDepositRes = await sendDeposit({
            amountWei,
            depositedAsset,
            risk: targetRiskPool,
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
