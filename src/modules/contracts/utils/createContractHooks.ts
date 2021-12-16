import { SWRConfiguration } from 'swr'
import { useContractSwr } from '../hooks/useContractSwr'
import {
  useContractInstanceRpc,
  useContractInstanceWeb3,
} from '../hooks/useContractInstance'

import type {
  FilterAsyncMethods,
  UnpackedPromise,
} from 'shared/utils/utilTypes'
import type {
  FactoryInstance,
  ContractFactoryAbstract,
  ContractConnector,
} from '../types'

type Args<C extends ContractFactoryAbstract> = {
  connector: ContractConnector<C>
}

export function createContractHooks<CF extends ContractFactoryAbstract>({
  connector,
}: Args<CF>) {
  type C = FactoryInstance<CF>

  function useContractRpc() {
    return useContractInstanceRpc(connector)
  }

  function useContractWeb3() {
    return useContractInstanceWeb3(connector)
  }

  const getUseSwr = function (type: 'web3' | 'rpc') {
    return function <
      M extends FilterAsyncMethods<C>,
      R extends UnpackedPromise<ReturnType<C[M]>>,
    >(
      method: M | false,
      params: Parameters<C[M]>,
      config?: SWRConfiguration<R, Error>,
    ) {
      const contractInstance =
        type === 'web3' ? useContractWeb3() : useContractRpc()
      const data = useContractSwr(contractInstance, method, params, config)
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
