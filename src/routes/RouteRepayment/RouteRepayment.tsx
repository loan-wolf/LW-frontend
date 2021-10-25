import { useState } from 'react'

import { FormRepayment, SuccessData } from 'modules/pools/ui/FormRepayment'
// import { DashboardRowDeposit } from 'modules/pools/ui/DashboardRowDeposit'
import { ContractSuccessTitle } from 'shared/ui/common/ContractSuccessTitle'
import { NarrowWrapper } from 'shared/ui/layout/NarrowWrapper'

// import { PoolAsset } from 'modules/pools/constants/poolAssets'
import { createRoute } from 'modules/router/utils/createRoute'

function RouteRepayment() {
  const [successData, setSuccessData] = useState<SuccessData | null>(null)

  if (successData) {
    return (
      <>
        <ContractSuccessTitle>Repayment is in progress.</ContractSuccessTitle>
        {JSON.stringify(successData, null, 2)}
        {/* <DashboardRowDeposit
          deposit={{
            depositedAsset: successData.depositedAsset as PoolAsset,
            amount: Number(successData.amount),
            apy: 13,
            interest: 45,
          }}
        /> */}
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
