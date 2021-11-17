import { useState } from 'react'

import { FormRepayment, SuccessData } from 'modules/pools/ui/FormRepayment'
// import { SendedTransaction } from 'modules/pools/ui/SendedTransaction'
import { ContractSuccessTitle } from 'shared/ui/common/ContractSuccessTitle'
import { NarrowWrapper } from 'shared/ui/layout/NarrowWrapper'

import { createRoute } from 'modules/router/utils/createRoute'

function RouteRepayment() {
  const [successData, setSuccessData] = useState<SuccessData | null>(null)

  if (successData) {
    return (
      <>
        <ContractSuccessTitle>Repayment is in progress.</ContractSuccessTitle>
        {/* <SendedTransaction transactionType="Repayment" /> */}
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
