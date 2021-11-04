import { Tabs, Tab } from 'shared/ui/common/Tabs'
import {
  DashboardRowLoan,
  LoanDataMock,
} from 'modules/pools/ui/DashboardRowLoan'
import {
  DashboardRowDeposit,
  DepositDataMock,
} from 'modules/pools/ui/DashboardRowDeposit'
import {
  DashboardRowCollateral,
  CollateralDataMock,
} from 'modules/pools/ui/DashboardRowCollateral'
import { DashboardEmptyCTA } from 'modules/pools/ui/DashboardEmptyCTA'
import { withWalletConnectCheck } from 'modules/wallet/hocs/withWalletConnectCheck'

import { createRoute } from 'modules/router/utils/createRoute'
import * as links from 'modules/router/links'

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
        {DEPOSITS_MOCK.map((deposit, i) => (
          <DashboardRowDeposit key={i} deposit={deposit} />
        ))}
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
          <DashboardRowLoan key={i} loan={loan} />
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
        {COLLATERALS_MOCK.map((collateral, i) => (
          <DashboardRowCollateral key={i} collateral={collateral} />
        ))}
        {/* <DashboardEmptyCTA
          link={links.deposit}
          fashion="green"
          entityName="stakes"
          actionText="Stake"
        /> */}
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
        <DashboardEmptyCTA
          link={links.deposit}
          fashion="blue"
          timeText="old"
          entityName="deposits"
          actionText="Deposit"
        />
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
        <DashboardEmptyCTA
          link={links.borrow}
          fashion="purple"
          timeText="old"
          entityName="loans"
          actionText="Borrow"
        />
      </Tab>
    </Tabs>
  )
}

const RouteDashboardChecked = withWalletConnectCheck(RouteDashboard)

export const routeDashboard = createRoute({
  headerTitle: 'Dashboard',
  component: RouteDashboardChecked,
})
