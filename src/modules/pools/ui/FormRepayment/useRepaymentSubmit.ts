import * as ethers from 'ethers'

import { useCallback, useState } from 'react'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'
import { useTransactionSender } from 'modules/blockChain/hooks/useTransactionSender'
import { useTxAssetAllowance } from 'modules/contracts/hooks/useTxAssetAllowance'

import { ContractBonds, ContractInvestor } from 'modules/contracts/contracts'
import type { FormValues, SuccessData } from './types'
import * as errors from 'shared/constants/errors'

type Args = {
  loanId: string
  isLocked: boolean
  setLocked: (isLocked: boolean) => void
  onSuccess: (successData: SuccessData) => void
}

export function useRepaymentSubmit({
  loanId,
  isLocked,
  setLocked,
  onSuccess,
}: Args) {
  const { chainId } = useWeb3()
  const contractBonds = ContractBonds.useContractWeb3()
  const contractInvestor = ContractInvestor.useContractWeb3()
  const [isSubmitting, setSubmitting] = useState(false)
  const { makeAllowanceIfNeeded, txAllowance } = useTxAssetAllowance()

  /**
   * Approval tx
   */
  const populateApproval = useCallback(async () => {
    const populated = await contractBonds.populateTransaction.setApprovalForAll(
      contractInvestor.address,
      true,
    )

    return populated
  }, [contractBonds, contractInvestor.address])
  const txApproval = useTransactionSender(populateApproval)

  /**
   * Payment tx
   */
  const populatePayment = useCallback(
    async ({ amountWei }: { amountWei: ethers.BigNumberish }) => {
      const populated = await contractInvestor.populateTransaction.payment(
        loanId,
        amountWei,
        {
          gasLimit: 500000,
        },
      )
      return populated
    },
    [contractInvestor, loanId],
  )
  const txPayment = useTransactionSender(populatePayment)

  const { send: sendApproval } = txApproval
  const { send: sendPayment } = txPayment

  const submit = useCallback(
    async (formValues: FormValues) => {
      if (!isLocked) {
        setLocked(true)
      } else {
        try {
          const { amount, depositedAsset } = formValues

          if (!depositedAsset) {
            throw new Error(errors.depositAssetNotSelected)
          }

          setSubmitting(true)

          const txApprovalRes = await sendApproval()
          await txApprovalRes.wait()

          const amountWei = ethers.utils.parseEther(amount)

          await makeAllowanceIfNeeded({
            spenderAddress: ContractInvestor.chainAddress.get(chainId),
            amountWei,
            asset: depositedAsset,
          })

          const txRepaymentRes = await sendPayment({ amountWei })

          setSubmitting(false)
          onSuccess({ tx: txRepaymentRes, formValues })
        } catch (err) {
          setSubmitting(false)
          throw err
        }
      }
    },
    [
      isLocked,
      setLocked,
      sendApproval,
      makeAllowanceIfNeeded,
      chainId,
      sendPayment,
      onSuccess,
    ],
  )

  return {
    submit,
    txApproval,
    txAllowance,
    txPayment,
    isSubmitting,
  }
}
