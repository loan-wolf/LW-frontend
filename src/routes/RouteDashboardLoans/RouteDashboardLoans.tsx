import {
  DashboardRowLoan,
  LoanDataMock,
} from 'modules/pools/ui/DashboardRowLoan'
import { createRoute } from 'modules/router/utils/createRoute'

const LOANS_MOCK: LoanDataMock[] = [
  {
    id: '0xaqw11..98',
    borrowedAmount: 23,
    borrowedAsset: 'DAI',
    collateralAmount: 123,
    collateralAsset: 'ETH',
    apr: 14,
    time: '2021-10-10 19:59:59',
    principal: 13,
    interest: 23,
  },
  {
    id: '0xaqw11..98',
    borrowedAmount: 42323,
    borrowedAsset: 'DAI',
    collateralAmount: 123,
    collateralAsset: 'ETH',
    apr: 14,
    time: '2021-10-10 19:59:59',
    principal: 13,
    interest: 23,
  },
  {
    id: '0xaqw11..98',
    borrowedAmount: 32,
    borrowedAsset: 'DAI',
    collateralAmount: 232332,
    collateralAsset: 'ETH',
    apr: 14,
    time: '2021-10-10 19:59:59',
    principal: 13,
    interest: 23,
  },
]

function RouteDashboardLoans() {
  return (
    <>
      {LOANS_MOCK.map((loan, i) => (
        <DashboardRowLoan key={i} loan={loan} />
      ))}
    </>
  )
}

export const routeDashboardLoans = createRoute({
  component: RouteDashboardLoans,
})
