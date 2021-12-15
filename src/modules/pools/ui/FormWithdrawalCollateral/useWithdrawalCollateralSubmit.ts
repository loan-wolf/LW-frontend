import * as ethers from 'ethers'
import type { BigNumberish } from '@ethersproject/bignumber'
import { useCallback, useState } from 'react'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'
import { useTransactionSender } from 'modules/blockChain/hooks/useTransactionSender'

import type { FormValues, SuccessData } from './types'
import { logGroup } from 'shared/utils/logGroup'
import { getInvestorContractByAddress } from 'modules/pools/utils/getInvestorContract'
import * as errors from 'shared/constants/errors'

type Args = {
  loanId: string
  investorAddress: string
  onSuccess: (res: SuccessData) => void
}

export function useWithdrawalCollateralSubmit({
  loanId,
  investorAddress,
  onSuccess,
}: Args) {
  const { chainId, library, walletAddress } = useWeb3()
  const [isSubmitting, setSubmitting] = useState(false)

  const populateWithdrawal = useCallback(
    async ({
      amountWei,
      address,
    }: {
      amountWei: BigNumberish
      address: string
    }) => {
      logGroup('Submitting withdrawal collateral', {
        Address: address,
        Amount: ethers.utils.formatEther(amountWei),
        'Amount in wei': String(amountWei),
      })

      const Investor = getInvestorContractByAddress(chainId, investorAddress)
      const investor = Investor.connectWeb3({ chainId, library })
      const populated = await investor.populateTransaction.claimCollateral(
        loanId,
        amountWei,
        {
          gasLimit: 500000,
        },
      )
      return populated
    },
    [chainId, investorAddress, library, loanId],
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
