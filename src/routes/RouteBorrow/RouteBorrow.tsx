import { useState } from 'react'

import { NarrowWrapper } from 'shared/ui/layout/NarrowWrapper'
import { FormBorrow, SuccessData } from 'modules/pools/ui/FormBorrow'
import { ContractSuccessTitle } from 'shared/ui/common/ContractSuccessTitle'
import { DashboardRowLoan } from 'modules/pools/ui/DashboardRowLoan'

import { PoolAsset } from 'modules/pools/constants/poolAssets'
import { createRoute } from 'modules/router/utils/createRoute'

function RouteBorrow() {
  const [successData, setSuccessData] = useState<SuccessData | null>(null)

  if (!successData) {
    return (
      <NarrowWrapper>
        <FormBorrow onSuccess={setSuccessData} />
      </NarrowWrapper>
    )
  }

  return (
    <>
      <ContractSuccessTitle>Deposit Successful.</ContractSuccessTitle>

      <DashboardRowLoan
        loan={{
          id: '0xaqw11..98',
          borrowedAmount: Number(successData.amount),
          borrowedAsset: successData.borrowedAsset as PoolAsset,
          collateralAmount: 123,
          collateralAsset: successData.collateralAsset as PoolAsset,
          principal: Number(successData.amount),
          interest: Number(successData.amount),
          apr: 13,
          time: '2021-10-10 19:59:59',
        }}
      />
    </>
  )
}

export const routeBorrow = createRoute({
  headerTitle: 'Borrow',
  layoutType: 'narrow-extended',
  component: RouteBorrow,
})
