import { createContext, useRef } from 'react'
import { InjectedConnector } from '@web3-react/injected-connector'
import { Chains } from 'modules/blockChain/chains'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { getRpcUrl } from 'modules/blockChain/utils/getRpcUrls'
import { isClientSide } from 'shared/utils/isClientSide'

export type WalletConnectorsValue = {
  metamask: InjectedConnector
  walletconnect: WalletConnectConnector | null
}

export const walletConnectorsContext = createContext(
  {} as WalletConnectorsValue,
)

type Props = {
  children?: React.ReactNode
}

export function WalletConnectorsProvider({ children }: Props) {
  const { current } = useRef({
    isInited: false,
    connectors: {} as WalletConnectorsValue,
  })

  if (!current.isInited && isClientSide()) {
    current.connectors.metamask = new InjectedConnector({})

    current.connectors.walletconnect = new WalletConnectConnector({
      rpc: Object.values(Chains).reduce(
        (acc, chainId) => ({
          ...acc,
          [chainId]: getRpcUrl(chainId),
        }),
        {},
      ),
    })

    current.isInited = true
  }

  return (
    <walletConnectorsContext.Provider
      value={current.connectors}
      children={children}
    />
  )
}
