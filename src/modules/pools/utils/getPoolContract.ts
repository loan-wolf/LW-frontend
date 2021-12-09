import { memoize } from 'lodash'
import type { Chains } from 'modules/blockChain/chains'
import * as contracts from 'modules/contracts/contracts'

const poolContracts = [contracts.ContractILiquidityPool] as const

// TODO: `useGlobalMemo` hook instead of memoize
// may be more efficient in garbage collecting aspect
export const getPoolContractByAddress = memoize(
  (poolAddress: string, chainId: Chains) => {
    const contract = poolContracts.find(
      c => c.chainAddress.get(chainId) === poolAddress,
    )
    if (!contract) {
      throw new Error(`Pool contract with address ${poolAddress} not defined`)
    }
    return contract
  },
)
