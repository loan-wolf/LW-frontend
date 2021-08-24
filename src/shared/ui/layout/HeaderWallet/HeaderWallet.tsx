import { useWalletInfo } from 'modules/wallet/hooks/useWalletInfo'
import { useWalletModal } from 'modules/wallet/ui/WalletModal'
import { useConnectWalletModal } from 'modules/wallet/ui/ConnectWalletModal'

import { Button } from 'shared/ui/common/Button'
import { AddressBadge } from 'modules/blockChain/ui/AddressBadge'

import s from './HeaderWallet.module.scss'

export function HeaderWallet() {
  const { isWalletConnected, walletAddress } = useWalletInfo()
  const openWalletModal = useWalletModal()
  const openConnectWalletModal = useConnectWalletModal()

  if (!isWalletConnected) {
    return <Button onClick={openConnectWalletModal} children="Connect" />
  }

  return (
    <AddressBadge
      symbols={4}
      address={walletAddress!}
      onClick={openWalletModal}
      className={s.badge}
    />
  )
}
