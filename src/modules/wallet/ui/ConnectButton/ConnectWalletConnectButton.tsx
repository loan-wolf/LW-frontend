import { useCallback } from 'react'
import { useWalletConnect } from '../../hooks/useWalletConnect'
import { useWalletConnectors } from '../../hooks/useWalletConnectors'
import { ConnectButton } from './ConnectButton'
import { ConnectWalletButtonProps } from './types'
import iconUrl from 'assets/walletconnect.svg'

export function ConnectWalletConnectButton(props: ConnectWalletButtonProps) {
  const { onConnect, ...rest } = props
  const connect = useWalletConnect()
  const { walletconnect: connector } = useWalletConnectors()

  const handleConnect = useCallback(async () => {
    if (!connector) return

    onConnect?.()
    connector.deactivate()
    await connector.close()
    await connect(connector)
  }, [connector, connect, onConnect])

  return (
    <ConnectButton
      {...rest}
      iconSrc={iconUrl}
      onClick={handleConnect}
      children="WalletConnect"
    />
  )
}
