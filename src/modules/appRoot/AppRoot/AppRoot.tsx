import { StrictMode, useMemo, memo } from 'react'
import { useWalletAutoConnect } from 'modules/wallet/hooks/useWalletAutoConnect'
import { useCurrentChain } from 'modules/blockChain/hooks/useCurrentChain'

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

  return (
    <PageLayout>
      {isChainSupported ? (
        <PageMain />
      ) : (
        <ContentBox>Chain not supported</ContentBox>
      )}
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
