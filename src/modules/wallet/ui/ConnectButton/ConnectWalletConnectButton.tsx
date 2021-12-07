import { useCallback } from 'react'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'
import { useWalletConnectors } from '../../hooks/useWalletConnectors'
import { ConnectButton } from './ConnectButton'
import { ConnectWalletButtonProps } from './types'
import { ReactComponent as WalletConnectSVG } from 'assets/walletconnect.svg'

export function ConnectWalletConnectButton(props: ConnectWalletButtonProps) {
  const { onConnect, ...rest } = props
  const { activate } = useWeb3()
  const { walletconnect: connector } = useWalletConnectors()

  const handleConnect = useCallback(async () => {
    if (!connector) return

    onConnect?.()
    connector.deactivate()
    await connector.close()
    await activate(connector)
  }, [connector, activate, onConnect])

  return (
    <ConnectButton
      {...rest}
      icon={<WalletConnectSVG />}
      onClick={handleConnect}
      children="WalletConnect"
    />
  )
}
