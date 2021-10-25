import { useConnectWalletModal } from '../ConnectWalletModal'

import { Text } from 'shared/ui/common/Text'

import s from './ConnectWalletScreen.module.scss'

export function ConnectWalletScreen() {
  const modalConnectModal = useConnectWalletModal()

  return (
    <div className={s.wrap}>
      <Text
        size={16}
        weight={500}
        color="secondary"
        isUppercased
        isCentered
        className={s.title}
      >
        Wallet is not connected
      </Text>

      <button
        className={s.button}
        type="button"
        onClick={modalConnectModal.open}
      >
        <Text size={12} weight={500} color="secondary" isUppercased>
          Please
        </Text>
        <Text
          size={36}
          weight={700}
          color="inherit"
          isUppercased
          className={s.buttonMainText}
        >
          Connect
          <br /> wallet
        </Text>
        <Text size={12} weight={500} color="secondary" isUppercased>
          to see your dashboard
        </Text>
      </button>
    </div>
  )
}
