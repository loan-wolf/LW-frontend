import { Redirect, useLocation } from 'react-router'
import { TabsRouted, TabRouted } from 'shared/ui/common/TabsRouted'
import { withWalletConnectCheck } from 'modules/wallet/hocs/withWalletConnectCheck'
import { createRoute } from 'modules/router/utils/createRoute'
import * as links from 'modules/router/links'

type Props = {
  children?: React.ReactNode
}

function RouteDashboard({ children }: Props) {
  const location = useLocation()

  if (location.pathname === links.dashboard) {
    return <Redirect to={links.dashboardDeposits} />
  }

  return (
    <>
      <TabsRouted>
        <TabRouted
          link={links.dashboardDeposits}
          title={
            <>
              Ongoing
              <br />
              deposits
            </>
          }
        />
        <TabRouted
          link={links.dashboardLoans}
          title={
            <>
              Ongoing
              <br />
              Loans
            </>
          }
        />
        <TabRouted
          link={links.dashboardCollateral}
          title={
            <>
              My
              <br />
              Collateral
            </>
          }
        />
        <TabRouted
          link={links.dashboardOldDeposits}
          title={
            <>
              Old
              <br />
              Deposits
            </>
          }
        />
        <TabRouted
          link={links.dashboardOldLoans}
          title={
            <>
              Old
              <br />
              loans
            </>
          }
        />
      </TabsRouted>

      {children}
    </>
  )
}

const RouteDashboardChecked = withWalletConnectCheck(RouteDashboard)

export const routeDashboard = createRoute({
  headerTitle: 'Dashboard',
  component: RouteDashboardChecked,
})
