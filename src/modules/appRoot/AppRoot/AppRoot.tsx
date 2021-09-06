import { StrictMode, useMemo, memo } from 'react'
import { useWalletAutoConnect } from 'modules/wallet/hooks/useWalletAutoConnect'
import { useCurrentChain } from 'modules/blockChain/hooks/useCurrentChain'
import { useWalletInfo } from 'modules/wallet/hooks/useWalletInfo'

import { PageMain } from 'pages/PageMain'
import { ContentBox } from 'shared/ui/layout/ContentBox'
import { PageLayout } from 'shared/ui/layout/PageLayout'
import { Web3AppProvider } from 'modules/blockChain/providers/web3Provider'
import { WalletConnectorsProvider } from 'modules/wallet/providers/walletConnectorsProvider'
import { ThemeProvider } from 'modules/themes/ThemeProvider'
import { ModalProvider } from 'modules/modal/providers/ModalProvider'
import 'modules/appRoot/global-styles.scss'

import { SUPPORTED_CHAINS } from 'config'

function App() {
  useWalletAutoConnect()
  const chainId = useCurrentChain()
  const isChainSupported = useMemo(
    () => SUPPORTED_CHAINS.includes(chainId),
    [chainId],
  )
  const { isWalletConnected } = useWalletInfo()

  if (!isChainSupported) {
    return (
      <PageLayout>
        <ContentBox>Chain not supported</ContentBox>
      </PageLayout>
    )
  }

  if (!isWalletConnected) {
    return (
      <PageLayout>
        <ContentBox>Wallet is not connected</ContentBox>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <PageMain />
    </PageLayout>
  )
}

const AppMemoized = memo(App)

export function AppRoot() {
  return (
    <StrictMode>
      <Web3AppProvider>
        <WalletConnectorsProvider>
          <ThemeProvider>
            <ModalProvider>
              <AppMemoized />
            </ModalProvider>
          </ThemeProvider>
        </WalletConnectorsProvider>
      </Web3AppProvider>
    </StrictMode>
  )
}
