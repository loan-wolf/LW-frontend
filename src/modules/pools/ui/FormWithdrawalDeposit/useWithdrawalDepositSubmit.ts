// import * as ethers from 'ethers'
import { useCallback, useState } from 'react'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'
import { useTransactionSender } from 'modules/blockChain/hooks/useTransactionSender'

import { ContractLiquidityFarm } from 'modules/contracts/contracts'
import type { FormValues, SuccessData } from './types'
import { logGroup } from 'shared/utils/logGroup'
import * as errors from 'shared/constants/errors'

type Args = {
  poolAddress: string
  onSuccess: (res: SuccessData) => void
}

export function useWithdrawalDepositSubmit({ poolAddress, onSuccess }: Args) {
  const { walletAddress } = useWeb3()
  const [isSubmitting, setSubmitting] = useState(false)
  const contractLiquidityFarm = ContractLiquidityFarm.useContractWeb3()

  const populateWithdrawal = useCallback(
    async (args: { poolAddress: string }) => {
      logGroup('Submitting deposit withdrawal', {
        'Pool address': args.poolAddress,
      })

      const populated =
        await contractLiquidityFarm.populateTransaction.withdrawZapAndUnstake(
          args.poolAddress,
          {
            gasLimit: 500000,
          },
        )
      return populated
    },
    [contractLiquidityFarm],
  )
  const txWithdrawal = useTransactionSender(populateWithdrawal)

  const { send: sendWithdrawal } = txWithdrawal

  const submit = useCallback(
    async (formValues: FormValues) => {
      try {
        setSubmitting(true)
        if (!walletAddress) throw new Error(errors.connectWallet)

        // const amountWei = ethers.utils.parseEther(formValues.amount)

        const txWithdrawalRes = await sendWithdrawal({
          poolAddress,
        })

        setSubmitting(false)
        onSuccess({ tx: txWithdrawalRes, formValues })
      } catch (err) {
        setSubmitting(false)
        throw err
      }
    },
    [walletAddress, sendWithdrawal, poolAddress, onSuccess],
  )

  return {
    submit,
    txWithdrawal,
    isSubmitting,
  }
}
