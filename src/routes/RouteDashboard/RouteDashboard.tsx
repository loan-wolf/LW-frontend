import { Tabs, Tab } from 'shared/ui/common/Tabs'
import { LoanInfoRow, LoanDataMock } from 'modules/pools/ui/LoanInfoRow'

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

function RouteDashboard() {
  return (
    <Tabs>
      {/* Ongoing deposits */}
      <Tab
        title={
          <>
            Ongoing
            <br />
            deposits
          </>
        }
      >
        123
      </Tab>

      {/* Ongoing Loans */}
      <Tab
        title={
          <>
            Ongoing
            <br />
            Loans
          </>
        }
      >
        {LOANS_MOCK.map((loan, i) => (
          <LoanInfoRow key={i} loan={loan} />
        ))}
      </Tab>

      {/* Collateral */}
      <Tab
        title={
          <>
            My
            <br />
            Collateral
          </>
        }
      >
        12
      </Tab>

      {/* Old deposits */}
      <Tab
        title={
          <>
            Old
            <br />
            Deposits
          </>
        }
      >
        12
      </Tab>

      {/* Old loans */}
      <Tab
        title={
          <>
            Old
            <br />
            loans
          </>
        }
      >
        12
      </Tab>
    </Tabs>
  )
}

export const routeDashboard = createRoute({
  headerTitle: 'Dashboard',
  component: RouteDashboard,
})
