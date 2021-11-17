import {
  DashboardRowDeposit,
  DepositDataMock,
} from 'modules/pools/ui/DashboardRowDeposit'
import { createRoute } from 'modules/router/utils/createRoute'

const DEPOSITS_MOCK: DepositDataMock[] = [
  {
    depositedAsset: 'DAI',
    amount: 121312,
    apy: 12,
    interest: 32,
  },
  {
    depositedAsset: 'DAI',
    amount: 121,
    apy: 12,
    interest: 32,
  },
  {
    depositedAsset: 'ETH',
    amount: 23,
    apy: 32,
    interest: 12,
  },
]

function RouteDashboardDeposits() {
  return (
    <>
      {DEPOSITS_MOCK.map((deposit, i) => (
        <DashboardRowDeposit key={i} deposit={deposit} />
      ))}
    </>
  )
}

export const routeDashboardDeposits = createRoute({
  component: RouteDashboardDeposits,
})
