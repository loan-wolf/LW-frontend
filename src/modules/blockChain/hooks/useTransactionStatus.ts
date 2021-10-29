import { useState, useEffect } from 'react'
import { useWeb3 } from './useWeb3'
import { TxStatus } from '../types'

type Args = {
  hash?: string | null
  defaultStatus?: TxStatus
}

export function useTransactionStatus({ hash, defaultStatus = 'empty' }: Args) {
  const { library } = useWeb3()
  const [status, setStatus] = useState<TxStatus>(defaultStatus)

  useEffect(() => {
    if (!library || !hash) {
      setStatus(defaultStatus)
      return
    }

    const checkTransaction = (e: any) => {
      if (!e) {
        setStatus('pending')
      } else if (e.status === 1) {
        setStatus('success')
      } else if (e.status === 0) {
        setStatus('failed')
      }
    }

    library.getTransactionReceipt(hash).then(checkTransaction)
    library.on(hash, checkTransaction)

    return () => {
      library.off(hash)
    }
  }, [library, hash, defaultStatus])

  return {
    status,
    isEmpty: status === 'empty',
    isFailed: status === 'failed',
    isPending: status === 'pending',
    isSuccess: status === 'success',
  }
}
