import { useConnectWalletModal } from '../ConnectWalletModal'
import { ActionToContinueScreen } from 'shared/ui/common/ActionToContinueScreen'

export function ConnectWalletScreen() {
  const modalConnectModal = useConnectWalletModal()

  return (
    <ActionToContinueScreen
      title="Wallet is not connected"
      actionTitle="Please"
      actionText={
        <>
          Connect
          <br /> wallet
        </>
      }
      actionHint="to continue using app"
      onClick={modalConnectModal.open}
    />
  )
}
