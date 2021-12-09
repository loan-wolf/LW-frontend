import type { Chains } from 'modules/blockChain/chains'
import type { Signer, providers } from 'ethers'
import type { ChainAddress } from './utils/ChainAddress'

export type Library = Signer | providers.Provider | undefined

export interface ContractFactoryAbstract {
  name: string
  connect(address: string, library: Library): unknown
}

export type FactoryInstance<F extends ContractFactoryAbstract> = ReturnType<
  F['connect']
>

export type AddressesMap = {
  [key in Chains]?: string
}

export type ConnectRpcArgs = {
  chainId: Chains
}

export type ConnectWeb3Args = {
  chainId: Chains
  library: providers.Web3Provider | undefined
}

export type ConnectRpcFn<F extends ContractFactoryAbstract> = (
  args: ConnectRpcArgs,
) => FactoryInstance<F>

export type ConnectWeb3Fn<F extends ContractFactoryAbstract> = (
  args: ConnectWeb3Args,
) => FactoryInstance<F>

export type ContractConnector<F extends ContractFactoryAbstract> = {
  factory: F
  chainAddress: ChainAddress
  connectRpc: ConnectRpcFn<F>
  connectWeb3: ConnectWeb3Fn<F>
}
