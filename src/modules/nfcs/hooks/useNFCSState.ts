import { useState, useMemo, useEffect } from 'react'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'
import { useSWR } from 'modules/network/hooks/useSwr'
import { useWalletInfo } from 'modules/wallet/hooks/useWalletInfo'
import { useCurrentChain } from 'modules/blockChain/hooks/useCurrentChain'
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
  const chainId = useCurrentChain()
  const { library } = useWeb3()
  const { walletAddress } = useWalletInfo()
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

  const tokenId = useSWR(`tokenId-${chainId}-${walletAddress}`, async () => {
    if (!walletAddress) return
    const events = await contractRociCreditToken.queryFilter(
      eventFilterTokenMinted,
    )
    const event = events[0]
    if (!events[0] || !event.decode) {
      return undefined
    }
    const decoded = event.decode(event.data, event.topics)
    return decoded._tokenId
  })

  const score = ContractScoreDB.useSwrWeb3(
    tokenId.data ? 'getCurrentScore' : null,
    tokenId.data,
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
  } else {
    status = 'loading'
  }

  return {
    nfcs: score.data ?? -1,
    status: status,
    txHash,
    setTxHash: setNFCSTxHash,
  }
}

const init = {
  nfcs: -1,
  status: 'loading' as NFCSStatus,
  txHash: null as string | null,
  setTxHash: setNFCSTxHash,
}
export const useNFCSState = singletonHook(init, useNFCSStateImpl)
