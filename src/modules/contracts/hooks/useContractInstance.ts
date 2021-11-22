import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'
import { useCurrentChain } from 'modules/blockChain/hooks/useCurrentChain'
import { useGlobalMemo } from 'shared/hooks/useGlobalMemo'
import {
  ContractConnector,
  ContractFactoryAbstract,
  FactoryInstance,
} from '../types'

export function useContractInstanceRpc<F extends ContractFactoryAbstract>(
  connector: ContractConnector<F>,
) {
  type Instance = FactoryInstance<F>

  const chainId = useCurrentChain()
  const address = connector.chainAddress.get(chainId)

  return useGlobalMemo(
    () => connector.connectRpc({ chainId }) as Instance,
    `contract-rpc-${address}`,
  )
}

export function useContractInstanceWeb3<F extends ContractFactoryAbstract>(
  connector: ContractConnector<F>,
) {
  type Instance = FactoryInstance<F>

  const { library, active, account } = useWeb3()
  const chainId = useCurrentChain()
  const activeKey = active ? 'active' : 'inactive'
  const address = connector.chainAddress.get(chainId)

  return useGlobalMemo(
    () =>
      connector.connectWeb3({
        chainId,
        library: library?.getSigner(),
      }) as Instance,
    ['contract-web3-', activeKey, chainId, account, address].join('-'),
  )
}
