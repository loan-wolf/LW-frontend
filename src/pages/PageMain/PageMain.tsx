import { usePoolContract } from 'modules/contracts/hooks/usePoolContract'

import { ContentBox } from 'shared/ui/layout/ContentBox'
import { PoolInfo } from 'modules/pools/ui/PoolInfo'

export function PageMain() {
  const PoolContract0 = usePoolContract(0)

  return (
    <ContentBox>
      {PoolContract0 ? (
        <PoolInfo ContractLoanWolfPool={PoolContract0} />
      ) : (
        'Pool is loading...'
      )}
    </ContentBox>
  )
}
