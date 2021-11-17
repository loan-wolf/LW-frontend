import * as ethers from 'ethers'

import { useCallback } from 'react'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'
import { useWalletInfo } from 'modules/wallet/hooks/useWalletInfo'
import { useCurrentChain } from 'modules/blockChain/hooks/useCurrentChain'
import { useTransactionSender } from 'modules/blockChain/hooks/useTransactionSender'

import {
  getPoolAssetAddress,
  getPoolAssetContract,
} from 'modules/pools/constants/poolAssets'
import { ContractInvestor } from 'modules/contracts/contracts'
import { CollateralManager } from 'modules/contracts/contractAddresses'
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
  library: 'Library not defined',
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
  const { library } = useWeb3()
  const { walletAddress } = useWalletInfo()
  const contractInvestor = ContractInvestor.useContractWeb3()

  /**
   * Allow token spending tx
   */
  const populateAllowance = useCallback(
    async (formValues: FormValues) => {
      const { amount, collateralAsset } = formValues

      if (!library) throw new Error(errors.library)
      if (!collateralAsset) throw new Error(errors.collateralAsset)

      const amountWei = ethers.utils.parseEther(amount)
      const CollateralAssetContract = getPoolAssetContract(collateralAsset)

      if (!CollateralAssetContract) {
        throw new Error('Contract does not defined for this collateral asset')
      }

      const collateralAssetContract = CollateralAssetContract.connectWeb3({
        chainId,
        library: library.getSigner(),
      })

      const populated =
        await collateralAssetContract.populateTransaction.approve(
          CollateralManager[chainId],
          amountWei,
        )

      return populated
    },
    [chainId, library],
  )
  const txAllowance = useTransactionSender(populateAllowance)

  /**
   * Borrow tx
   */
  const populateBorrow = useCallback(
    async (formValues: FormValues) => {
      const { amount, collateralAsset } = formValues

      if (!walletAddress) throw new Error(errors.wallet)
      if (!collateralAsset) throw new Error(errors.collateralAsset)

      const collateralAddress = getPoolAssetAddress(collateralAsset, chainId)
      if (!collateralAddress) throw new Error(errors.collateralAddress)

      const amountWei = ethers.utils.parseEther(amount)
      const numberOfLoans = await contractInvestor.getNumberOfLoans(
        walletAddress,
      )
      const loanId = await contractInvestor.getId(walletAddress, numberOfLoans)

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
        Number(formValues.term),
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
    [chainId, collateralAmount, contractInvestor, walletAddress],
  )
  const txBorrow = useTransactionSender(populateBorrow)

  const { send: sendAllowance } = txAllowance
  const { send: sendBorrow } = txBorrow

  const submit = useCallback(
    async (formValues: FormValues) => {
      if (!isLocked) {
        setLocked(true)
      } else {
        const txAllowanceRes = await sendAllowance(formValues)
        await txAllowanceRes.wait()
        const txBorrowRes = await sendBorrow(formValues)
        onSuccess({ tx: txBorrowRes, formValues })
      }
    },
    [isLocked, setLocked, sendAllowance, sendBorrow, onSuccess],
  )

  return {
    submit,
    txAllowance,
    txBorrow,
  }
}
