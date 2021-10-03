import { StrictMode, useMemo, memo } from 'react'
import { useWalletAutoConnect } from 'modules/wallet/hooks/useWalletAutoConnect'
import { useCurrentChain } from 'modules/blockChain/hooks/useCurrentChain'
// import { useWalletInfo } from 'modules/wallet/hooks/useWalletInfo'

import { BrowserRouter } from 'react-router-dom'

import { RouterRoot } from 'modules/router/ui/RouterRoot'
import { ContentBox } from 'shared/ui/layout/ContentBox'
import { Web3AppProvider } from 'modules/blockChain/providers/web3Provider'
import { WalletConnectorsProvider } from 'modules/wallet/providers/walletConnectorsProvider'
import { ThemeProvider } from 'modules/themes/ThemeProvider'
import { ModalProvider } from 'modules/modal/providers/ModalProvider'
// import { HeaderWallet } from 'shared/ui/layout/HeaderWallet'
import 'modules/appRoot/fonts.scss'
import 'modules/appRoot/global-styles.scss'

import { BASE_URL, SUPPORTED_CHAINS } from 'config'

function App() {
  useWalletAutoConnect()
  const chainId = useCurrentChain()
  const isChainSupported = useMemo(
    () => SUPPORTED_CHAINS.includes(chainId),
    [chainId],
  )
  // const { isWalletConnected } = useWalletInfo()

  if (!isChainSupported) {
    return (
      <>
        <ContentBox>Chain not supported</ContentBox>
      </>
    )
  }

  // if (!isWalletConnected) {
  //   return (
  //     <>
  //       <ContentBox>Wallet is not connected</ContentBox>
  //       <HeaderWallet />
  //     </>
  //   )
  // }

  return <RouterRoot />
}

const AppMemoized = memo(App)

export function AppRoot() {
  return (
    <StrictMode>
      <Web3AppProvider>
        <WalletConnectorsProvider>
          <ThemeProvider>
            <BrowserRouter basename={BASE_URL}>
              <ModalProvider>
                <AppMemoized />
              </ModalProvider>
            </BrowserRouter>
          </ThemeProvider>
        </WalletConnectorsProvider>
      </Web3AppProvider>
    </StrictMode>
  )
}
