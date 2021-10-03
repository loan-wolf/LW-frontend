import { useCallback } from 'react'
import { useWalletConnect } from '../../hooks/useWalletConnect'
import { useWalletConnectors } from '../../hooks/useWalletConnectors'
import { ConnectButton } from './ConnectButton'
import { ConnectWalletButtonProps } from './types'
import { ReactComponent as MetamaskSVG } from 'assets/metamask.svg'
import { openWindow } from 'shared/utils/openWindow'
import { isClientSide } from 'shared/utils/isClientSide'

export function ConnectMetamaskButton(props: ConnectWalletButtonProps) {
  const { onConnect, ...rest } = props
  const connect = useWalletConnect()
  const { metamask: connector } = useWalletConnectors()

  const openInWallet = useCallback(() => {
    const url = encodeURIComponent(window.location.host)
    openWindow(`https://metamask.app.link/dapp/${url}`)
  }, [])

  const handleConnect = useCallback(async () => {
    const hasInjected = isClientSide() && 'ethereum' in window

    if (!hasInjected) {
      openInWallet()
      return
    }

    onConnect?.()
    await connect(connector)
  }, [onConnect, connect, connector, openInWallet])

  return (
    <ConnectButton
      {...rest}
      icon={<MetamaskSVG />}
      onClick={handleConnect}
      children="Metamask"
    />
  )
}
