import { useWalletInfo } from '../hooks/useWalletInfo'
import { ConnectWalletScreen } from 'modules/wallet/ui/ConnectWalletScreen'

export function withWalletConnectCheck<P>(Wrapped: React.ComponentType<P>) {
  return function WalletConnectCheck(props: P) {
    const { isWalletConnected } = useWalletInfo()

    if (isWalletConnected) {
      return <Wrapped {...props} />
    }

    return <ConnectWalletScreen />
  }
}
