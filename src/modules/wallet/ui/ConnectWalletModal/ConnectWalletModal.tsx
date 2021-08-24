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
    <Modal {...props} width={360}>
      <Text size={16} isCentered className={s.title}>
        Connect with:
      </Text>
      <ConnectMetamaskButton {...common} />
      <ConnectWalletConnectButton {...common} />
    </Modal>
  )
}
