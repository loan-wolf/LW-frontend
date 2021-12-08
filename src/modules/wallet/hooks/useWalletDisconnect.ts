import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { useCallback } from 'react'

export function useWalletDisconnect() {
  const { deactivate, connector } = useWeb3()
  return useCallback(() => {
    deactivate()
    connector?.deactivate()
    if (connector instanceof WalletConnectConnector) connector.close()
    if (connector instanceof WalletLinkConnector) connector.close()
  }, [deactivate, connector])
}
