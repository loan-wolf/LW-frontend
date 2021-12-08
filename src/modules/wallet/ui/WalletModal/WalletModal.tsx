import { useCallback } from 'react'
import { useEtherscanOpener } from 'modules/blockChain/hooks/useEtherscanOpener'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'
import { useWalletDisconnect } from 'modules/wallet/hooks/useWalletDisconnect'
import { useWalletConnectorStorage } from 'modules/wallet/hooks/useWalletConnectorStorage'
import { useCopyToClipboard } from 'shared/hooks/useCopyToClipboard'

import { Text } from 'shared/ui/common/Text'
import { Button } from 'shared/ui/controls/Button'
import { Modal, ModalProps } from 'modules/modal/ui/Modal'

import { ContractTestDAI } from 'modules/contracts/contracts'
import { formatBalance } from 'modules/blockChain/utils/formatBalance'
import s from './WalletModal.module.scss'

export function WalletModal(props: ModalProps) {
  const { onClose } = props
  const { walletAddress: address } = useWeb3()
  const [connector] = useWalletConnectorStorage()
  const disconnect = useWalletDisconnect()

  const totalSupply = ContractTestDAI.useSwrWeb3('totalSupply')
  const daiBalance = ContractTestDAI.useSwrWeb3(
    address ? 'balanceOf' : null,
    String(address),
  )

  const handleDisconnect = useCallback(() => {
    disconnect()
    onClose()
  }, [disconnect, onClose])

  const handleCopy = useCopyToClipboard(address ?? '')
  const handleEtherscan = useEtherscanOpener(address ?? '', 'address')

  return (
    <Modal {...props} width={420}>
      <Text size={14} className={s.title}>
        Connected with {connector}
      </Text>

      <Text size={12} className={s.infoRow}>
        Address:
        <br />
        {address}
      </Text>

      <Text size={12} className={s.infoRow}>
        Total Dai supply:
        <br />
        {totalSupply.isLoading ? 'Loading...' : formatBalance(totalSupply.data)}
      </Text>

      <Text size={12} className={s.infoRow}>
        Wallet Dai balance:
        <br />
        {daiBalance.isLoading ? 'Loading...' : formatBalance(daiBalance.data)}
      </Text>

      <div className={s.actions}>
        <Button
          size={30}
          fashion="glass"
          onClick={handleCopy}
          children="Copy address"
        />
        <Button
          size={30}
          fashion="glass"
          onClick={handleEtherscan}
          children="View on Etherscan"
        />
        <Button size={30} fashion="glass" onClick={handleDisconnect}>
          Disconnect
        </Button>
      </div>
    </Modal>
  )
}
