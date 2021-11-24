import { StrictMode } from 'react'

import { BrowserRouter } from 'react-router-dom'
import { SingletonHooksContainer } from 'react-singleton-hook'

import { RouterRoot } from 'modules/router/ui/RouterRoot'
import { Web3AppProvider } from 'modules/blockChain/providers/web3Provider'
import { WalletConnectorsProvider } from 'modules/wallet/providers/walletConnectorsProvider'
import { ThemeProvider } from 'modules/themes/ThemeProvider'
import { ModalProvider } from 'modules/modal/providers/ModalProvider'
import { SupportedChainGuard } from 'modules/blockChain/ui/SupportedChainGuard'

import 'modules/appRoot/fonts.scss'
import 'modules/appRoot/global-styles.scss'

import { BASE_URL, SUPPORTED_CHAINS } from 'config'

export function AppRoot() {
  return (
    <StrictMode>
      <Web3AppProvider>
        <WalletConnectorsProvider>
          <ThemeProvider>
            <BrowserRouter basename={BASE_URL}>
              <SupportedChainGuard
                switchTo={SUPPORTED_CHAINS[0]}
                supportedChains={SUPPORTED_CHAINS}
              >
                <SingletonHooksContainer />
                <ModalProvider>
                  <RouterRoot />
                </ModalProvider>
              </SupportedChainGuard>
            </BrowserRouter>
          </ThemeProvider>
        </WalletConnectorsProvider>
      </Web3AppProvider>
    </StrictMode>
  )
}
