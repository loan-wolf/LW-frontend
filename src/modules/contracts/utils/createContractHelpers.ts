import { ChainAddress } from './ChainAddress'
import type { AddressesMap, ContractFactoryAbstract } from '../types'
import { createContractConnectors } from './createContractConnectors'
import { createContractHooks } from './createContractHooks'

type CreatorArgs<F> = {
  name: string
  factory: F
  address: AddressesMap
}

export function createContractHelpers<F extends ContractFactoryAbstract>({
  name,
  factory,
  address,
}: CreatorArgs<F>) {
  const chainAddress = new ChainAddress(name, address)
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
