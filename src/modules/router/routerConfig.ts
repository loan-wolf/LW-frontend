import { RouteConfig } from 'react-router-config'

import { routeMain } from 'routes/RouteMain'
import { routeMarkets } from 'routes/RouteMarkets/RouteMarkets'
import { routeDeposit } from 'routes/RouteDeposit'
import { routeBorrow } from 'routes/RouteBorrow'
import { routeDashboard } from 'routes/RouteDashboard'
import { routeRepayment } from 'routes/RouteRepayment'

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
      },
      {
        path: links.repayment,
        ...routeRepayment,
      },
    ],
  },
]
