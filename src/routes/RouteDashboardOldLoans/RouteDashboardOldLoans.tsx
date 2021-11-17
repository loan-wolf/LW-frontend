import { DashboardEmptyCTA } from 'modules/pools/ui/DashboardEmptyCTA'

import { createRoute } from 'modules/router/utils/createRoute'
import * as links from 'modules/router/links'

function RouteDashboardOldLoans() {
  return (
    <>
      <DashboardEmptyCTA
        link={links.borrow}
        fashion="purple"
        timeText="old"
        entityName="loans"
        actionText="Borrow"
      />
    </>
  )
}

export const routeDashboardOldLoans = createRoute({
  component: RouteDashboardOldLoans,
})
