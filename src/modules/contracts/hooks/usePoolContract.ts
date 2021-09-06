import { useCurrentChain } from 'modules/blockChain/hooks/useCurrentChain'
import { useGlobalMemo } from 'shared/hooks/useGlobalMemo'
import {
  ContractPoolFactory,
  getContractLoanWolfPool,
} from 'modules/contracts/contracts'

export function usePoolContract(poolIdx: number) {
  const currentChain = useCurrentChain()

  const { data: poolAddress } = ContractPoolFactory.useSwrWeb3(
    'poolsList',
    poolIdx,
  )

  const contractLoanWolfPool = useGlobalMemo(() => {
    if (!poolAddress) return null

    const address = { [currentChain]: poolAddress }
    return getContractLoanWolfPool(address)
  }, `loan-wolf-pool-${currentChain}-${poolAddress}`)

  return contractLoanWolfPool
}
