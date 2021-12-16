import { useState } from 'react'

import { FormDeposit, SuccessData } from 'modules/pools/ui/FormDeposit'
import { SendedTransaction } from 'modules/pools/ui/SendedTransaction'
import { ContractSuccessTitle } from 'shared/ui/common/ContractSuccessTitle'
import { NarrowWrapper } from 'shared/ui/layout/NarrowWrapper'

import { createRoute } from 'modules/router/utils/createRoute'

function RouteDeposit() {
  const [successData, setSuccessData] = useState<SuccessData | null>(null)

  if (successData) {
    return (
      <>
        <ContractSuccessTitle txHash={successData.tx.hash}>
          Deposit is progress.
        </ContractSuccessTitle>
        <SendedTransaction tx={successData.tx} transactionType="Deposit" />
      </>
    )
  }

  return (
    <NarrowWrapper>
      <FormDeposit onSuccess={setSuccessData} />
    </NarrowWrapper>
  )
}

export const routeDeposit = createRoute({
  headerTitle: 'Deposit',
  layoutType: 'narrow-extended',
  component: RouteDeposit,
})
