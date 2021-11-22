import { JsonRpcProvider } from '@ethersproject/providers'
import { getRpcUrl } from 'modules/blockChain/utils/getRpcUrls'

import type { ChainAddress } from './ChainAddress'
import type {
  FactoryInstance,
  ContractFactoryAbstract,
  ConnectRpcFn,
  ConnectWeb3Fn,
  ContractConnector,
} from '../types'

type Args<F> = {
  factory: F
  chainAddress: ChainAddress
}

export function createContractConnectors<F extends ContractFactoryAbstract>({
  factory,
  chainAddress,
}: Args<F>): ContractConnector<F> {
  type Instance = FactoryInstance<F>

  const connectRpc: ConnectRpcFn<F> = ({ chainId }) => {
    return factory.connect(
      chainAddress.get(chainId),
      new JsonRpcProvider(getRpcUrl(chainId), chainId),
    ) as Instance
  }

  const connectWeb3: ConnectWeb3Fn<F> = ({ chainId, library }) => {
    return factory.connect(chainAddress.get(chainId), library) as Instance
  }

  return {
    factory,
    chainAddress,
    connectRpc,
    connectWeb3,
  }
}
