import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'
import { useCurrentChain } from 'modules/blockChain/hooks/useCurrentChain'
import { useGlobalMemo } from 'shared/hooks/useGlobalMemo'
import { useContractSwr } from '../hooks/useContractSwr'

import type { Signer, providers } from 'ethers'
import { JsonRpcProvider } from '@ethersproject/providers'
import { getRpcUrl } from 'modules/blockChain/utils/getRpcUrls'
import { Chains, getChainName } from 'modules/blockChain/chains'
import { FilterMethods } from 'shared/utils/utilTypes'

type Library = Signer | providers.Provider | undefined

interface Factory {
  name: string
  connect(address: string, library: Library): unknown
}

export type Address = {
  [key in Chains]?: string
}

type CreatorArgs<F> = {
  factory: F
  address: Address
}

export function createContractHelpers<F extends Factory>({
  address,
  factory,
}: CreatorArgs<F>) {
  type Instance = ReturnType<F['connect']>

  function getAddressByChain(chainId: Chains) {
    if (!address.hasOwnProperty(chainId)) {
      const chainName = getChainName(chainId)
      throw new Error(
        `Contract ${factory.name} does not support chain ${chainName}`,
      )
    }
    return address[chainId] as string
  }

  function connectRpc({ chainId }: { chainId: Chains }) {
    return factory.connect(
      getAddressByChain(chainId),
      new JsonRpcProvider(getRpcUrl(chainId), chainId),
    ) as Instance
  }

  function connectWeb3({
    chainId,
    library,
  }: {
    chainId: Chains
    library: Library
  }) {
    return factory.connect(getAddressByChain(chainId), library) as Instance
  }

  function useContractRpc() {
    const chainId = useCurrentChain()

    return useGlobalMemo(
      () => connectRpc({ chainId }),
      `contract-rpc-${address[chainId]}`,
    )
  }

  function useContractWeb3() {
    const { library, active, account } = useWeb3()
    const chainId = useCurrentChain()

    return useGlobalMemo(
      () =>
        connectWeb3({
          chainId,
          library: library?.getSigner(),
        }),
      [
        'contract-web3-',
        active ? 'active' : 'inactive',
        address[chainId],
        account,
      ].join('-'),
    )
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
    address,
    factory,
    connectRpc,
    connectWeb3,
    useContractRpc,
    useContractWeb3,
    useSwrWeb3,
    useSwrRpc,
  }
}
