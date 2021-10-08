import cns from 'classnames'
import { useWalletInfo } from 'modules/wallet/hooks/useWalletInfo'
import { useWalletModal } from 'modules/wallet/ui/WalletModal'
import { useConnectWalletModal } from 'modules/wallet/ui/ConnectWalletModal'

import { Text } from 'shared/ui/common/Text'
import { Button } from 'shared/ui/controls/Button'
import { AddressIcon } from 'modules/blockChain/ui/AddressIcon'
import { ReactComponent as WalletSVG } from 'assets/wallet.svg'

import { trimAddress } from 'modules/blockChain/utils/trimAddress'
import s from './HeaderWallet.module.scss'

type Props = {
  className?: string
}

export function HeaderWallet({ className }: Props) {
  const { isWalletConnected, walletAddress } = useWalletInfo()
  const walletModal = useWalletModal()
  const connectWalletModal = useConnectWalletModal()

  if (!isWalletConnected || !walletAddress) {
    return (
      <Button
        isSquare
        size={40}
        fashion="glass"
        onClick={() => connectWalletModal.open({})}
      >
        <WalletSVG />
      </Button>
    )
  }

  return (
    <span
      className={cns(s.wrap, className)}
      onClick={() => walletModal.open({})}
    >
      <Text size={16} weight={500} className={s.address}>
        {trimAddress(String(walletAddress), 3)}
      </Text>
      <AddressIcon address={walletAddress} />
    </span>
  )
}
