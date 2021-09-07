import { useCallback } from 'react'
import { useWalletInfo } from 'modules/wallet/hooks/useWalletInfo'
import { useConnectWalletModal } from 'modules/wallet/ui/ConnectWalletModal'

export function useCheckWalletConnect() {
  const { isWalletConnected } = useWalletInfo()
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
