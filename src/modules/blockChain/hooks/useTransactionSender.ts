import { useState, useCallback } from 'react'
import { useWeb3 } from './useWeb3'
import { useTransactionStatus } from './useTransactionStatus'

import { toastError, toastInfo } from 'modules/toasts'
import { ResultTx } from '../types'
import { PopulatedTransaction } from '@ethersproject/contracts'
import { useEtherscanOpener } from './useEtherscanOpener'
import { getWalletNameFromProvider } from '../utils/getWalletNameFromProvider'

type PopulateFn =
  | (() => PopulatedTransaction)
  | (() => Promise<PopulatedTransaction>)

export function useTransactionSender(populateTx: PopulateFn) {
  const { library } = useWeb3()
  const [isSigning, setSigning] = useState(false)
  const [resultTx, setResultTx] = useState<ResultTx | null>(null)
  const open = useEtherscanOpener(resultTx?.hash, 'tx')
  const txStatus = useTransactionStatus({
    hash: resultTx?.hash,
  })

  const send = useCallback(async () => {
    if (!library) return

    try {
      setResultTx(null)
      setSigning(true)

      const signer = library.getSigner()
      const walletName = getWalletNameFromProvider(
        (signer.provider as any).provider,
      )
      const populatedTx = await populateTx()

      toastInfo(`Confirm transaction with ${walletName}`)
      const res = await signer.sendTransaction(populatedTx)

      setSigning(false)
      setResultTx(res)
    } catch (error: any) {
      setSigning(false)
      console.error(error)
      toastError(error.message || (error as any).toString())
    }
  }, [library, populateTx])

  return {
    tx: resultTx,
    send,
    open,
    isSigning,
    ...txStatus,
  }
}
