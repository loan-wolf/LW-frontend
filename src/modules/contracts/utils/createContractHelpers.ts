import type { ChainAddress } from './ChainAddress'
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
  const connector = createContractConnectors({
    factory,
    chainAddress,
  })

  const hooks = createContractHooks({
    connector,
  })

  return {
    ...connector,
    ...hooks,
  }
}
