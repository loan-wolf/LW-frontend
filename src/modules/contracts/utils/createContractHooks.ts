import { useContractSwr } from '../hooks/useContractSwr'
import {
  useContractInstanceRpc,
  useContractInstanceWeb3,
} from '../hooks/useContractInstance'

import type { FilterMethods } from 'shared/utils/utilTypes'
import type { ChainAddress } from './BunchAddresses'
import type {
  FactoryInstance,
  ContractFactoryAbstract,
  ContractConnectors,
} from '../types'

type Args<F extends ContractFactoryAbstract> = {
  connectors: ContractConnectors<F>
  chainAddress: ChainAddress
}

export function createContractHooks<F extends ContractFactoryAbstract>({
  connectors,
  chainAddress,
}: Args<F>) {
  type Instance = FactoryInstance<F>

  function useContractRpc() {
    return useContractInstanceRpc(chainAddress, connectors.connectRpc)
  }

  function useContractWeb3() {
    return useContractInstanceWeb3(chainAddress, connectors.connectWeb3)
  }

  const getUseSwr = function (type: 'web3' | 'rpc') {
    return function <M extends FilterMethods<Instance>>(
      method: M | null,
      ...params: Parameters<Instance[M]>
    ) {
      const contractInstance =
        type === 'web3' ? useContractWeb3() : useContractRpc()
      const data = useContractSwr(contractInstance, method, ...params)
      return data
    }
  }

  const useSwrWeb3 = getUseSwr('web3')
  const useSwrRpc = getUseSwr('rpc')

  return {
    useContractRpc,
    useContractWeb3,
    useSwrWeb3,
    useSwrRpc,
  }
}
