import { RouteConfig } from 'react-router-config'

import { routeMain } from 'routes/RouteMain'
import { routeMarkets } from 'routes/RouteMarkets/RouteMarkets'
import { routeDeposit } from 'routes/RouteDeposit'
import { routeBorrow } from 'routes/RouteBorrow'
import { routeDashboard } from 'routes/RouteDashboard'
import { routeDashboardDeposits } from 'routes/RouteDashboardDeposits'
import { routeDashboardLoans } from 'routes/RouteDashboardLoans'
import { routeDashboardCollateral } from 'routes/RouteDashboardCollateral'
import { routeDashboardOldDeposits } from 'routes/RouteDashboardOldDeposits'
import { routeDashboardOldLoans } from 'routes/RouteDashboardOldLoans'
import { routeRepayment } from 'routes/RouteRepayment'
import { routeWithdrawal } from 'routes/RouteWithdrawalCollateral'

import { AppLayout } from 'shared/ui/layout/AppLayout'

import * as links from './links'

export const routes: RouteConfig[] = [
  {
    path: links.home,
    exact: true,
    ...routeMain,
  },
  {
    component: AppLayout,
    routes: [
      {
        path: links.markets,
        ...routeMarkets,
      },
      {
        path: links.deposit,
        ...routeDeposit,
      },
      {
        path: links.borrow,
        ...routeBorrow,
      },
      {
        path: links.dashboard,
        ...routeDashboard,
        routes: [
          {
            path: links.dashboardDeposits,
            ...routeDashboardDeposits,
          },
          {
            path: links.dashboardLoans,
            ...routeDashboardLoans,
          },
          {
            path: links.dashboardCollateral,
            ...routeDashboardCollateral,
          },
          {
            path: links.dashboardOldDeposits,
            ...routeDashboardOldDeposits,
          },
          {
            path: links.dashboardOldLoans,
            ...routeDashboardOldLoans,
          },
        ],
      },
      {
        path: links.repayment(':loanId'),
        ...routeRepayment,
      },
      {
        path: links.withdrawalCollateral(':loanId'),
        ...routeWithdrawal,
      },
    ],
  },
]
