import { noop } from 'lodash'
import { useState, useMemo, useEffect } from 'react'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'
import { useSWR } from 'modules/network/hooks/useSwr'
import { useTransactionStatus } from 'modules/blockChain/hooks/useTransactionStatus'
import { singletonHook } from 'react-singleton-hook'

import {
  ContractScoreDB,
  ContractRociCreditToken,
} from 'modules/contracts/contracts'

export type NFCSStatus =
  | 'loading'
  | 'not-generated'
  | 'generating'
  | 'generated'
  | 'failed'

let globalSetNFCSTxHash: (txHash: string | null) => void = () => {
  throw new Error('you must useNFCSState before setting its state')
}
export const setNFCSTxHash: typeof globalSetNFCSTxHash = txHash =>
  globalSetNFCSTxHash(txHash)

function useNFCSStateImpl() {
  const { library, walletAddress } = useWeb3()
  const contractScoreDB = ContractScoreDB.useContractWeb3()
  const contractRociCreditToken = ContractRociCreditToken.useContractWeb3()
  const [txHash, setTxHash] = useState<string | null>(null)
  globalSetNFCSTxHash = setTxHash

  const eventFilterTokenMinted = useMemo(
    () => contractRociCreditToken.filters.TokenMinted(walletAddress),
    [contractRociCreditToken, walletAddress],
  )

  const txStatus = useTransactionStatus({
    hash: txHash,
    defaultStatus: 'empty',
  })

  const tokenId = ContractRociCreditToken.useSwrWeb3(
    Boolean(walletAddress) && 'getToken',
    [walletAddress!],
    { onError: noop, shouldRetryOnError: false },
  )

  const score = useSWR<{ CreditScore: number; ID: number }>(
    tokenId.data
      ? `https://cs-api-v1.roci.fi/score/${String(tokenId.data)}`
      : null,
  )

  /**
   * Revalidate when token generated
   */
  useEffect(() => {
    if (tokenId.data || tokenId.isLoading || !library) {
      return
    }
    const revalidate = tokenId.revalidate
    const doRevalidate = () => revalidate()
    library.on(eventFilterTokenMinted, doRevalidate)
    return () => {
      library.off(eventFilterTokenMinted, doRevalidate)
    }
  }, [
    tokenId.data,
    tokenId.isLoading,
    eventFilterTokenMinted,
    tokenId.revalidate,
    score.revalidate,
    contractScoreDB,
    library,
  ])

  /**
   * Revalidate when score generated
   */
  useEffect(() => {
    if (!tokenId.data || score.data || !library) {
      return
    }
    const eventFilterScoreReceived = contractScoreDB.filters.ScoreReceived(
      tokenId.data,
    )
    const revalidate = score.revalidate
    const doRevalidate = () => revalidate()
    library.on(eventFilterScoreReceived, doRevalidate)
    return () => {
      library.off(eventFilterScoreReceived, doRevalidate)
    }
  }, [score.data, tokenId.data, score.revalidate, contractScoreDB, library])

  /**
   * Collect final data
   */
  let status: NFCSStatus = 'loading'

  if (txStatus.isFailed) {
    status = 'failed'
  } else if (
    (txStatus.isPending || txStatus.isSuccess) &&
    score.data === undefined
  ) {
    status = 'generating'
  } else if (tokenId.data === undefined && score.data === undefined) {
    status = 'not-generated'
  } else if (tokenId.data !== undefined && score.data !== undefined) {
    status = 'generated'
  }

  const tokenParsed = tokenId.data?.toNumber()
  useEffect(() => {
    console.log('Token id:', tokenParsed)
  }, [tokenParsed])

  let nfcs = score.data?.CreditScore ?? -1
  if (nfcs === 1000) {
    nfcs = 9
  }

  return {
    nfcs,
    tokenId: tokenParsed,
    status: status,
    txHash,
    setTxHash: setNFCSTxHash,
  }
}

const init = {
  nfcs: -1,
  tokenId: undefined as number | undefined,
  status: 'loading' as NFCSStatus,
  txHash: null as string | null,
  setTxHash: setNFCSTxHash,
}
export const useNFCSState = singletonHook(init, useNFCSStateImpl)
