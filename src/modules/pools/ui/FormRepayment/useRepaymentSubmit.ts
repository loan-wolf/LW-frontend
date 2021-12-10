import * as ethers from 'ethers'

import { useCallback, useState } from 'react'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'
import { useTransactionSender } from 'modules/blockChain/hooks/useTransactionSender'
import { useTxAssetAllowance } from 'modules/contracts/hooks/useTxAssetAllowance'
import { useConnectorInvestor } from 'modules/pools/hooks/useConnectorInvestor'

import { ContractBonds } from 'modules/contracts/contracts'
import type { FormValues, SuccessData } from './types'
import type { PoolAsset } from 'modules/pools/constants/poolAssets'
import { getInvestorContractByAsset } from 'modules/pools/utils/getInvestorContract'
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
  // TODO: must depends on asset
  // const contractInvestor = ContractInvestor_DAI_rDAI1.useContractWeb3()
  const [isSubmitting, setSubmitting] = useState(false)
  const { makeAllowanceIfNeeded, txAllowance } = useTxAssetAllowance()
  const connectInvstorContract = useConnectorInvestor()

  /**
   * Approval tx
   */
  const populateApproval = useCallback(
    async (investorAddress: string) => {
      const populated =
        await contractBonds.populateTransaction.setApprovalForAll(
          investorAddress,
          true,
        )
      return populated
    },
    [contractBonds],
  )
  const txApproval = useTransactionSender(populateApproval)

  /**
   * Payment tx
   */
  const populatePayment = useCallback(
    async ({
      asset,
      amountWei,
    }: {
      asset: PoolAsset
      amountWei: ethers.BigNumberish
    }) => {
      const investor = connectInvstorContract(asset)
      const populated = await investor.populateTransaction.payment(
        loanId,
        amountWei,
        {
          gasLimit: 500000,
        },
      )
      return populated
    },
    [connectInvstorContract, loanId],
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
          const { amount, borrowedAsset } = formValues

          if (!borrowedAsset) {
            throw new Error(errors.depositAssetNotSelected)
          }

          setSubmitting(true)

          const Investor = getInvestorContractByAsset(borrowedAsset)
          const investorAddress = Investor.chainAddress.get(chainId)

          const txApprovalRes = await sendApproval(investorAddress)
          await txApprovalRes.wait()

          const amountWei = ethers.utils.parseEther(amount)

          await makeAllowanceIfNeeded({
            spenderAddress: investorAddress,
            amountWei,
            asset: borrowedAsset,
          })

          const txRepaymentRes = await sendPayment({
            asset: borrowedAsset,
            amountWei,
          })

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
      chainId,
      sendApproval,
      makeAllowanceIfNeeded,
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
