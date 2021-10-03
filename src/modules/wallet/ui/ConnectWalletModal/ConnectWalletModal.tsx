import { Text } from 'shared/ui/common/Text'
import { Modal, ModalProps } from 'modules/modal/ui/Modal'
import {
  ConnectMetamaskButton,
  ConnectWalletConnectButton,
} from '../ConnectButton'

import s from './ConnectWalletModal.module.scss'

type Props = ModalProps & {}

export function ConnectWalletModal(props: Props) {
  const { onClose } = props

  const common = {
    onConnect: onClose,
  }

  return (
    <Modal {...props}>
      <Text size={44} weight={700} isUppercased isCentered className={s.title}>
        Connect with
      </Text>
      <Text size={20} weight={400} isCentered className={s.subtitle}>
        To make transactions you need connect Wallet first
      </Text>
      <div className={s.connectors}>
        <ConnectMetamaskButton {...common} />
        <ConnectWalletConnectButton {...common} />
      </div>
    </Modal>
  )
}
