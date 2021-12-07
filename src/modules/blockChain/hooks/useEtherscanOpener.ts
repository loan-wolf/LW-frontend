import { useCallback } from 'react'
import { useWeb3 } from './useWeb3'
import { openWindow } from 'shared/utils/openWindow'
import { getEtherscanLink, EtherscanEntities } from '../utils/getEtherscanLink'

export function useEtherscanOpener(
  hash: string | undefined | null,
  entity: EtherscanEntities,
) {
  const { chainId } = useWeb3()
  return useCallback(() => {
    if (!hash) return
    const link = getEtherscanLink(chainId, hash, entity)
    openWindow(link)
  }, [chainId, entity, hash])
}
