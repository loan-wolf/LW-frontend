import { useCallback } from 'react'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'
import { useWalletConnectors } from '../../hooks/useWalletConnectors'
import { ConnectButton } from './ConnectButton'
import { ConnectWalletButtonProps } from './types'
import { ReactComponent as MetamaskSVG } from 'assets/metamask.svg'
import { openWindow } from 'shared/utils/openWindow'
import { isClientSide } from 'shared/utils/isClientSide'

export function ConnectMetamaskButton(props: ConnectWalletButtonProps) {
  const { onConnect, ...rest } = props
  const { activate } = useWeb3()
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
    await activate(connector)
  }, [onConnect, activate, connector, openInWallet])

  return (
    <ConnectButton
      {...rest}
      icon={<MetamaskSVG />}
      onClick={handleConnect}
      children="Metamask"
    />
  )
}
