import { useMemo } from 'react'
import { useWalletInfo } from 'modules/wallet/hooks/useWalletInfo'
import { useWalletModal } from 'modules/wallet/ui/WalletModal'
import { useConnectWalletModal } from 'modules/wallet/ui/ConnectWalletModal'

import { Text } from 'shared/ui/common/Text'
import { Button } from 'shared/ui/controls/Button'
import { ReactComponent as WalletSVG } from 'assets/wallet.svg'
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'

import { trimAddress } from 'modules/blockChain/utils/trimAddress'
import s from './HeaderWallet.module.scss'

export function HeaderWallet() {
  const { isWalletConnected, walletAddress } = useWalletInfo()
  const walletModal = useWalletModal()
  const connectWalletModal = useConnectWalletModal()

  const trimmedAddress = useMemo(
    () => trimAddress(String(walletAddress), 3),
    [walletAddress],
  )

  if (!isWalletConnected || !walletAddress) {
    return (
      <Button
        isSquare
        size="md"
        fashion="glass"
        onClick={() => connectWalletModal.open({})}
      >
        <WalletSVG />
      </Button>
    )
  }

  return (
    <span className={s.wrap} onClick={() => walletModal.open({})}>
      <Text size={16} weight={500} className={s.address}>
        {trimmedAddress}
      </Text>
      <button className={s.badge}>
        <Jazzicon
          diameter={40}
          seed={jsNumberForAddress(walletAddress)}
          paperStyles={{ borderRadius: 0 }}
        />
      </button>
    </span>
  )
}
