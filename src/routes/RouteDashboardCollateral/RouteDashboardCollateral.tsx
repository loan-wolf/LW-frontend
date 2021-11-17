import {
  DashboardRowCollateral,
  CollateralDataMock,
} from 'modules/pools/ui/DashboardRowCollateral'
import { createRoute } from 'modules/router/utils/createRoute'

const COLLATERALS_MOCK: CollateralDataMock[] = [
  {
    collateralAsset: 'ETH',
    amount: 123,
    unlockDate: '2021-10-10 19:59:59',
  },
  {
    collateralAsset: 'USDC',
    amount: 32,
    unlockDate: '2021-10-10 19:59:59',
  },
  {
    collateralAsset: 'DAI',
    amount: 42323,
    unlockDate: '2021-10-10 19:59:59',
  },
]

function RouteDashboardCollateral() {
  return (
    <>
      {COLLATERALS_MOCK.map((collateral, i) => (
        <DashboardRowCollateral key={i} collateral={collateral} />
      ))}
      {/* <DashboardEmptyCTA
          link={links.deposit}
          fashion="green"
          entityName="stakes"
          actionText="Stake"
        /> */}
    </>
  )
}

export const routeDashboardCollateral = createRoute({
  component: RouteDashboardCollateral,
})
