import { useState } from 'react'

import { FormWithdrawal, SuccessData } from 'modules/pools/ui/FormWithdrawal'
// import { WithdrawalSuccessRow } from 'modules/pools/ui/WithdrawalSuccessRow'
import { ContractSuccessTitle } from 'shared/ui/common/ContractSuccessTitle'
import { NarrowWrapper } from 'shared/ui/layout/NarrowWrapper'

import { createRoute } from 'modules/router/utils/createRoute'

function RouteWithdrawal() {
  const [successData, setSuccessData] = useState<SuccessData | null>(null)

  if (successData) {
    return (
      <>
        <ContractSuccessTitle>
          RouteWithdrawal is in progress.
        </ContractSuccessTitle>
        {/* <WithdrawalSuccessRow /> */}
      </>
    )
  }

  return (
    <NarrowWrapper>
      <FormWithdrawal onSuccess={setSuccessData} />
    </NarrowWrapper>
  )
}

export const routeWithdrawal = createRoute({
  headerTitle: 'Withdrawal',
  layoutType: 'narrow-extended',
  component: RouteWithdrawal,
})
