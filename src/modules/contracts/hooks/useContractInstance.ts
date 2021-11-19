import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'
import { useCurrentChain } from 'modules/blockChain/hooks/useCurrentChain'
import { useGlobalMemo } from 'shared/hooks/useGlobalMemo'
import {
  ConnectRpcFn,
  ConnectWeb3Fn,
  ContractFactoryAbstract,
  FactoryInstance,
} from '../types'
import type { ChainAddress } from '../utils/BunchAddresses'

export function useContractInstanceRpc<F extends ContractFactoryAbstract>(
  chainAddres: ChainAddress,
  connectRpc: ConnectRpcFn<F>,
) {
  type Instance = FactoryInstance<F>

  const chainId = useCurrentChain()
  const address = chainAddres.get(chainId)

  return useGlobalMemo(
    () => connectRpc({ chainId }) as Instance,
    `contract-rpc-${address}`,
  )
}

export function useContractInstanceWeb3<F extends ContractFactoryAbstract>(
  chainAddres: ChainAddress,
  connectWeb3: ConnectWeb3Fn<F>,
) {
  type Instance = FactoryInstance<F>

  const { library, active, account } = useWeb3()
  const chainId = useCurrentChain()
  const activeKey = active ? 'active' : 'inactive'
  const address = chainAddres.get(chainId)

  return useGlobalMemo(
    () =>
      connectWeb3({
        chainId,
        library: library?.getSigner(),
      }) as Instance,
    ['contract-web3-', activeKey, chainId, account, address].join('-'),
  )
}
