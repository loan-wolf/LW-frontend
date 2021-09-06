import { useCallback } from 'react'
import { useEtherscanOpener } from 'modules/blockChain/hooks/useEtherscanOpener'
import { useWalletInfo } from 'modules/wallet/hooks/useWalletInfo'
import { useWalletDisconnect } from 'modules/wallet/hooks/useWalletDisconnect'
import { useWalletConnectorStorage } from 'modules/wallet/hooks/useWalletConnectorStorage'
import { useCopyToClipboard } from 'shared/hooks/useCopyToClipboard'

import { Text } from 'shared/ui/common/Text'
import { Button } from 'shared/ui/common/Button'
import { Modal, ModalProps } from 'modules/modal/ui/Modal'

import { ContractTestDai } from 'modules/contracts/contracts'
import { formatBalance } from 'modules/blockChain/utils/formatBalance'
import s from './WalletModal.module.scss'

export function WalletModal(props: ModalProps) {
  const { onClose } = props
  const { walletAddress: address } = useWalletInfo()
  const [connector] = useWalletConnectorStorage()
  const disconnect = useWalletDisconnect()

  const { data: totalSupply, isLoading: isLoadingTotalSupply } =
    ContractTestDai.useSwrWeb3('totalSupply')

  const { data: daiBalance, isLoading: isLoadingDaiBalance } =
    ContractTestDai.useSwrWeb3(address ? 'balanceOf' : null, String(address))

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
        {isLoadingTotalSupply ? 'Loading...' : formatBalance(totalSupply)}
      </Text>

      <Text size={12} className={s.infoRow}>
        Wallet Dai balance:
        <br />
        {isLoadingDaiBalance ? 'Loading...' : formatBalance(daiBalance)}
      </Text>

      <div className={s.actions}>
        <Button size="sm" onClick={handleCopy} children="Copy address" />
        <Button
          size="sm"
          onClick={handleEtherscan}
          children="View on Etherscan"
        />
        <Button size="sm" onClick={handleDisconnect}>
          Disconnect
        </Button>
      </div>
    </Modal>
  )
}
