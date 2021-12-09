import * as ethers from 'ethers'

import { useCallback, useState } from 'react'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'
import { useTransactionSender } from 'modules/blockChain/hooks/useTransactionSender'
import { useTxAssetAllowance } from 'modules/contracts/hooks/useTxAssetAllowance'

import {
  getPoolAssetAddress,
  PoolAsset,
} from 'modules/pools/constants/poolAssets'
import { ContractCollateralManager } from 'modules/contracts/contracts'
import type { FormValues, SuccessData } from './types'
import * as errors from 'shared/constants/errors'
import { getInvestorContractByAsset } from 'modules/pools/utils/getInvestorContractByAsset'

const NCFSID = 1 // Oracle return hardcoded scores for now

type Args = {
  isLocked: boolean
  setLocked: (isLocked: boolean) => void
  onSuccess: (successData: SuccessData) => void
  collateralAmount: string
}

export function useBorrowSubmit({
  isLocked,
  setLocked,
  onSuccess,
  collateralAmount,
}: Args) {
  const { chainId, library, walletAddress } = useWeb3()
  const [isSubmitting, setSubmitting] = useState(false)
  const { makeAllowanceIfNeeded, txAllowance } = useTxAssetAllowance()

  /**
   * Borrow tx
   */
  const populateBorrow = useCallback(
    async ({
      borrowedAsset,
      amountWei,
      collateralAddress,
      address,
      term,
    }: {
      borrowedAsset: PoolAsset
      amountWei: ethers.BigNumberish
      collateralAddress: string
      address: string
      term: number
    }) => {
      const Investor = getInvestorContractByAsset(borrowedAsset)
      const investor = Investor.connectWeb3({ chainId, library })

      const numberOfLoans = await investor.getNumberOfLoans(address)
      const loanId = await investor.getId(address, numberOfLoans)

      const hash = ethers.utils.keccak256(
        ethers.utils.defaultAbiCoder.encode(
          ['address', 'uint256'],
          [investor.address, loanId],
        ),
      )

      const signature = await investor.signer.signMessage(
        ethers.utils.arrayify(hash),
      )

      const populated = await investor.populateTransaction.borrow(
        amountWei,
        term,
        NCFSID,
        ethers.utils.parseEther(collateralAmount),
        collateralAddress,
        hash,
        signature,
        {
          gasLimit: 1000000,
        },
      )

      return populated
    },
    [chainId, collateralAmount, library],
  )
  const txBorrow = useTransactionSender(populateBorrow)

  const { send: sendBorrow } = txBorrow

  const submit = useCallback(
    async (formValues: FormValues) => {
      if (!isLocked) {
        setLocked(true)
      } else {
        try {
          const { borrowedAsset, amount, collateralAsset } = formValues

          if (!walletAddress) throw new Error(errors.connectWallet)
          if (!borrowedAsset) {
            throw new Error(errors.borrowedAssetNotSelected)
          }
          if (!collateralAsset) {
            throw new Error(errors.collateralAssetNotSelected)
          }

          const collateralAddress = getPoolAssetAddress(
            collateralAsset,
            chainId,
          )

          if (!collateralAddress) throw new Error(errors.assetAddressNotDefined)

          setSubmitting(true)

          const amountWei = ethers.utils.parseEther(amount)

          await makeAllowanceIfNeeded({
            spenderAddress: ContractCollateralManager.chainAddress.get(chainId),
            amountWei,
            asset: collateralAsset,
          })

          const txBorrowRes = await sendBorrow({
            borrowedAsset,
            amountWei,
            collateralAddress,
            term: Number(formValues.term),
            address: walletAddress,
          })

          setSubmitting(false)
          onSuccess({ tx: txBorrowRes, formValues })
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
      sendBorrow,
      onSuccess,
    ],
  )

  return {
    submit,
    txAllowance,
    txBorrow,
    isSubmitting,
  }
}
