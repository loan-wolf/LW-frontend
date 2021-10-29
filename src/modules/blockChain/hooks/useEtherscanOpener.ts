import { useCallback } from 'react'
import { useCurrentChain } from './useCurrentChain'
import { openWindow } from 'shared/utils/openWindow'
import { getEtherscanLink, EtherscanEntities } from '../utils/getEtherscanLink'

export function useEtherscanOpener(
  hash: string | undefined | null,
  entity: EtherscanEntities,
) {
  const currentChain = useCurrentChain()
  return useCallback(() => {
    if (!hash) return
    const link = getEtherscanLink(currentChain, hash, entity)
    openWindow(link)
  }, [currentChain, entity, hash])
}
