import { useState } from 'react'

import { FormDeposit, SuccessData } from 'modules/pools/ui/FormDeposit'
import { DashboardRowDeposit } from 'modules/pools/ui/DashboardRowDeposit'
import { ContractSuccessTitle } from 'shared/ui/common/ContractSuccessTitle'
import { NarrowWrapper } from 'shared/ui/layout/NarrowWrapper'

import { PoolAsset } from 'modules/pools/constants/poolAssets'
import { createRoute } from 'modules/router/utils/createRoute'

function RouteDeposit() {
  const [successData, setSuccessData] = useState<SuccessData | null>(null)

  if (successData) {
    return (
      <>
        <ContractSuccessTitle>Loan is disbursed.</ContractSuccessTitle>
        <DashboardRowDeposit
          deposit={{
            depositedAsset: successData.depositedAsset as PoolAsset,
            amount: Number(successData.amount),
            apy: 13,
            interest: 45,
          }}
        />
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
