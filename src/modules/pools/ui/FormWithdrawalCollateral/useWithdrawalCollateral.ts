import * as ethers from 'ethers'
import type { BigNumberish } from '@ethersproject/bignumber'
import { useCallback, useState } from 'react'
import { useWalletInfo } from 'modules/wallet/hooks/useWalletInfo'
import { useTransactionSender } from 'modules/blockChain/hooks/useTransactionSender'

import {
  // ContractInvestor,
  ContractCollateralManager,
} from 'modules/contracts/contracts'
import type { FormValues, SuccessData } from './types'
import * as errors from 'shared/constants/errors'

type Args = {
  loanId: string
  onSuccess: (res: SuccessData) => void
}

export function useWithdrawalCollateral({ loanId, onSuccess }: Args) {
  const { walletAddress } = useWalletInfo()
  const [isSubmitting, setSubmitting] = useState(false)
  const contractCollateralManager = ContractCollateralManager.useContractWeb3()

  const populateWithdrawal = useCallback(
    async ({
      amountWei,
      address,
    }: {
      amountWei: BigNumberish
      address: string
    }) => {
      const populated =
        await contractCollateralManager.populateTransaction.withdrawal(
          loanId,
          amountWei,
          address,
          {
            gasLimit: 500000,
          },
        )
      return populated
    },
    [contractCollateralManager, loanId],
  )
  const txWithdrawal = useTransactionSender(populateWithdrawal)

  const { send: sendWithdrawal } = txWithdrawal

  const submit = useCallback(
    async (formValues: FormValues) => {
      try {
        setSubmitting(true)
        if (!walletAddress) throw new Error(errors.connectWallet)

        const amountWei = ethers.utils.parseEther(formValues.amount)

        const txWithdrawalRes = await sendWithdrawal({
          amountWei,
          address: walletAddress,
        })

        console.log(txWithdrawalRes)

        setSubmitting(false)
        onSuccess({ tx: txWithdrawalRes, formValues })
      } catch (err) {
        setSubmitting(false)
        throw err
      }
    },
    [walletAddress, sendWithdrawal, onSuccess],
  )

  return {
    submit,
    txWithdrawal,
    isSubmitting,
  }
}
