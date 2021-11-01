import { useWalletInfo } from 'modules/wallet/hooks/useWalletInfo'
import { useNFCSModal } from '../../../nfcs/ui/NFCSModal/useNFCSModal'

import { Text } from 'shared/ui/common/Text'
import { Modal, ModalProps } from 'modules/modal/ui/Modal'
import {
  ConnectButton,
  ConnectMetamaskButton,
  ConnectWalletConnectButton,
} from '../ConnectButton'
import { ReactComponent as BoltSVG } from 'assets/bolt.svg'

import s from './ConnectWalletModal.module.scss'
import { useCallback } from 'react'

type Props = ModalProps & {}

export function ConnectWalletModal(props: Props) {
  const { isWalletConnected } = useWalletInfo()
  const modalNFCS = useNFCSModal()
  const { onClose } = props

  const handleClickCreateNFCS = useCallback(() => {
    onClose()
    modalNFCS.open({})
  }, [modalNFCS, onClose])

  if (!isWalletConnected) {
    return (
      <Modal {...props}>
        <Text
          size={44}
          weight={700}
          isUppercased
          isCentered
          className={s.title}
        >
          Connect with
        </Text>
        <Text size={20} weight={400} isCentered className={s.subtitle}>
          To make transactions you need connect Wallet first
        </Text>
        <div className={s.connectors}>
          <ConnectMetamaskButton />
          <ConnectWalletConnectButton />
        </div>
      </Modal>
    )
  }

  return (
    <Modal width={690} {...props}>
      <Text size={44} weight={700} isUppercased isCentered className={s.title}>
        Wallet Connected
      </Text>
      <Text
        size={16}
        weight={400}
        isCentered
        color="secondary"
        className={s.connectedText}
      >
        In order to borrow with Roci you need to{' '}
        <span className={s.highlight}>mint your NFCS token first</span>. NFCS
        is&nbsp;the&nbsp;Non-fungible Credit Score, ERC-1155 token that will
        be&nbsp;minted on&nbsp;Ethereum blockchain and will generate your
        personal credit score. You&nbsp;can bundle several addresses into one
        NFCS representing your ownership of&nbsp;these addresses. By having NFCS
        in&nbsp;your wallet you can access credit at&nbsp;Roci.
      </Text>
      <div>
        <ConnectButton
          textColor="branded"
          icon={<BoltSVG />}
          onClick={handleClickCreateNFCS}
          className={s.createNFCS}
        >
          Create NFCS
        </ConnectButton>
      </div>
      <Text size={16} weight={400} isCentered className={s.connectedText}>
        This operation will&nbsp;mint NFCS token, will&nbsp;transfer it into
        your wallet and will&nbsp;trigger generation of your credit score that
        will allow you to&nbsp; access credit at&nbsp;Roci.
      </Text>
    </Modal>
  )
}
