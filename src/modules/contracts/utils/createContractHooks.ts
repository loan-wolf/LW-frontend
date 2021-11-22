import { useContractSwr } from '../hooks/useContractSwr'
import {
  useContractInstanceRpc,
  useContractInstanceWeb3,
} from '../hooks/useContractInstance'

import type { FilterMethods } from 'shared/utils/utilTypes'
import type {
  FactoryInstance,
  ContractFactoryAbstract,
  ContractConnector,
} from '../types'

type Args<F extends ContractFactoryAbstract> = {
  connector: ContractConnector<F>
}

export function createContractHooks<F extends ContractFactoryAbstract>({
  connector,
}: Args<F>) {
  type Instance = FactoryInstance<F>

  function useContractRpc() {
    return useContractInstanceRpc(connector)
  }

  function useContractWeb3() {
    return useContractInstanceWeb3(connector)
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
