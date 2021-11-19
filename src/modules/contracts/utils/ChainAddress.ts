import { Chains, getChainName } from 'modules/blockChain/chains'
import { AddressesMap } from '../types'

export class ChainAddress {
  private name: string
  private addressesMap: AddressesMap

  constructor(name: string, bunch: AddressesMap) {
    this.name = name
    this.addressesMap = bunch
  }

  get(chainId: Chains) {
    if (!this.addressesMap.hasOwnProperty(chainId)) {
      const chainName = getChainName(chainId)
      throw new Error(`${this.name} does not support chain ${chainName}`)
    }
    return this.addressesMap[chainId] as string
  }
}
