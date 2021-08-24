import { useMemo } from 'react'
import { useWeb3React } from '@web3-react/core'
import { parseChainId } from '../chains'
import { DEFAULT_CHAIN } from 'config'

export const useCurrentChain = () => {
  const { chainId = DEFAULT_CHAIN } = useWeb3React()
  return useMemo(() => parseChainId(chainId), [chainId])
}
