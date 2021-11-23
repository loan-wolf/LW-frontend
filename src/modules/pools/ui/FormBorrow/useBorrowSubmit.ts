import * as ethers from 'ethers'

import { useCallback, useState } from 'react'
import { useWalletInfo } from 'modules/wallet/hooks/useWalletInfo'
import { useCurrentChain } from 'modules/blockChain/hooks/useCurrentChain'
import { useTransactionSender } from 'modules/blockChain/hooks/useTransactionSender'
import { useAssetContractGetter } from 'modules/pools/hooks/useAssetContractGetter'

import {
  PoolAsset,
  getPoolAssetAddress,
} from 'modules/pools/constants/poolAssets'
import {
  ContractInvestor,
  ContractCollateralManager,
} from 'modules/contracts/contracts'
import type { FormValues, SuccessData } from './types'

const NCFSID = 1 // Oracle return hardcoded scores for now

type Args = {
  isLocked: boolean
  setLocked: (isLocked: boolean) => void
  onSuccess: (successData: SuccessData) => void
  collateralAmount: string
}

const errors = {
  wallet: 'Connect your wallet',
  collateralAsset: 'Collateral asset is not selected',
  collateralAddress: 'Address does not defined for this collateral asset',
}

export function useBorrowSubmit({
  isLocked,
  setLocked,
  onSuccess,
  collateralAmount,
}: Args) {
  const chainId = useCurrentChain()
  const { walletAddress } = useWalletInfo()
  const contractInvestor = ContractInvestor.useContractWeb3()
  const [isSubmitting, setSubmitting] = useState(false)
  const getAssetContract = useAssetContractGetter()

  /**
   * Allow token spending tx
   */
  const populateAllowance = useCallback(
    async (amountWei: ethers.BigNumberish, collateralAsset: PoolAsset) => {
      const collateralAssetContract = getAssetContract(collateralAsset)
      const populated =
        await collateralAssetContract.populateTransaction.approve(
          ContractCollateralManager.chainAddress.get(chainId),
          amountWei,
        )

      return populated
    },
    [chainId, getAssetContract],
  )
  const txAllowance = useTransactionSender(populateAllowance)

  /**
   * Borrow tx
   */
  const populateBorrow = useCallback(
    async ({
      amountWei,
      collateralAddress,
      address,
      term,
    }: {
      amountWei: ethers.BigNumberish
      collateralAddress: string
      address: string
      term: number
    }) => {
      const numberOfLoans = await contractInvestor.getNumberOfLoans(address)
      const loanId = await contractInvestor.getId(address, numberOfLoans)

      const hash = ethers.utils.keccak256(
        ethers.utils.defaultAbiCoder.encode(
          ['address', 'uint256'],
          [contractInvestor.address, loanId],
        ),
      )

      const signature = await contractInvestor.signer.signMessage(
        ethers.utils.arrayify(hash),
      )

      const populated = await contractInvestor.populateTransaction.borrow(
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
    [collateralAmount, contractInvestor],
  )
  const txBorrow = useTransactionSender(populateBorrow)

  const { send: sendAllowance } = txAllowance
  const { send: sendBorrow } = txBorrow

  const submit = useCallback(
    async (formValues: FormValues) => {
      if (!isLocked) {
        setLocked(true)
      } else {
        try {
          const { amount, collateralAsset } = formValues

          if (!walletAddress) throw new Error(errors.wallet)
          if (!collateralAsset) throw new Error(errors.collateralAsset)

          const collateralAddress = getPoolAssetAddress(
            collateralAsset,
            chainId,
          )

          if (!collateralAddress) throw new Error(errors.collateralAddress)

          setSubmitting(true)

          const collateralAssetContract = getAssetContract(collateralAsset)
          const allowance = await collateralAssetContract.allowance(
            walletAddress,
            ContractCollateralManager.chainAddress.get(chainId),
          )

          const amountWei = ethers.utils.parseEther(amount)

          if (allowance.lt(amountWei)) {
            const txAllowanceRes = await sendAllowance(
              amountWei,
              collateralAsset,
            )
            await txAllowanceRes.wait()
          }

          const txBorrowRes = await sendBorrow({
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
      getAssetContract,
      walletAddress,
      chainId,
      sendAllowance,
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
