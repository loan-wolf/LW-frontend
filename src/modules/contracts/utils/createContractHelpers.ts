import type { ChainAddress } from './BunchAddresses'
import type { ContractFactoryAbstract } from '../types'
import { createContractConnectors } from './createContractConnectors'
import { createContractHooks } from './createContractHooks'

type CreatorArgs<F> = {
  factory: F
  chainAddress: ChainAddress
}

export function createContractHelpers<F extends ContractFactoryAbstract>({
  factory,
  chainAddress,
}: CreatorArgs<F>) {
  const connectors = createContractConnectors({
    chainAddress,
    factory,
  })

  const hooks = createContractHooks({
    chainAddress,
    connectors,
  })

  return {
    factory,
    chainAddress,
    ...connectors,
    ...hooks,
  }
}
