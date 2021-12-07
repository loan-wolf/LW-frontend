import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'
import { ConnectWalletScreen } from 'modules/wallet/ui/ConnectWalletScreen'

export function withWalletConnectCheck<P>(Wrapped: React.ComponentType<P>) {
  return function WalletConnectCheck(props: P) {
    const { isWalletConnected } = useWeb3()

    if (isWalletConnected) {
      return <Wrapped {...props} />
    }

    return <ConnectWalletScreen />
  }
}
