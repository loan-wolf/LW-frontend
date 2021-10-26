import { useState } from 'react'

import { FormRepayment, SuccessData } from 'modules/pools/ui/FormRepayment'
import { RepaymentSuccessRow } from 'modules/pools/ui/RepaymentSuccessRow'
import { ContractSuccessTitle } from 'shared/ui/common/ContractSuccessTitle'
import { NarrowWrapper } from 'shared/ui/layout/NarrowWrapper'

import { createRoute } from 'modules/router/utils/createRoute'

function RouteRepayment() {
  const [successData, setSuccessData] = useState<SuccessData | null>(null)

  if (successData) {
    return (
      <>
        <ContractSuccessTitle>Repayment is in progress.</ContractSuccessTitle>
        <RepaymentSuccessRow />
      </>
    )
  }

  return (
    <NarrowWrapper>
      <FormRepayment onSuccess={setSuccessData} />
    </NarrowWrapper>
  )
}

export const routeRepayment = createRoute({
  headerTitle: 'Repayment',
  layoutType: 'narrow-extended',
  component: RouteRepayment,
})
