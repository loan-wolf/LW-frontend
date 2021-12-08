import { useCallback } from 'react'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'
import { useConnectWalletModal } from 'modules/wallet/ui/ConnectWalletModal'

export function useCheckWalletConnect() {
  const { isWalletConnected } = useWeb3()
  const сonnectWalletModal = useConnectWalletModal()
  const checkWalletConnect = useCallback(() => {
    if (!isWalletConnected) {
      сonnectWalletModal.open({})
      return false
    }
    return true
  }, [isWalletConnected, сonnectWalletModal])
  return checkWalletConnect
}
