import { useCallback, useMemo } from 'react'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'
import { useWalletDisconnect } from 'modules/wallet/hooks/useWalletDisconnect'
import { useWalletAutoConnect } from 'modules/wallet/hooks/useWalletAutoConnect'

import { AppWrap } from 'shared/ui/layout/AppWrap'
import { AppInner } from 'shared/ui/layout/AppInner'
import { DrawerLogo } from 'shared/ui/layout/DrawerLogo'
import { Button } from 'shared/ui/controls/Button'
// import { ContentBox } from 'shared/ui/layout/ContentBox'
import { ActionToContinueScreen } from 'shared/ui/common/ActionToContinueScreen'

import type { Chains } from 'modules/blockChain/chains'

// import s from './SupportedChainGuard.module.scss'

type Props = {
  children: React.ReactNode
  switchTo: Chains
  supportedChains: Chains[]
}

export function SupportedChainGuard({
  children,
  switchTo,
  supportedChains,
}: Props) {
  useWalletAutoConnect()
  const { library, chainId } = useWeb3()
  const disconnect = useWalletDisconnect()

  const isChainSupported = useMemo(
    () => supportedChains.includes(chainId),
    [chainId, supportedChains],
  )

  const changeNetwork = useCallback(() => {
    if (!library) return
    library.send('wallet_switchEthereumChain', [
      { chainId: `0x${switchTo.toString(16)}` },
    ])
  }, [switchTo, library])

  if (!isChainSupported) {
    return (
      <AppWrap>
        <AppInner>
          <DrawerLogo />
          <ActionToContinueScreen
            title="Selected network is not supported"
            actionTitle="Please"
            actionText={
              <>
                Switch
                <br /> network
              </>
            }
            actionHint="to continue using app"
            onClick={changeNetwork}
          />
          <br />
          <br />
          <Button fashion="glass" size={40} isCentered onClick={disconnect}>
            or disconnect
          </Button>
        </AppInner>
      </AppWrap>
    )
  }

  return <>{children}</>
}
