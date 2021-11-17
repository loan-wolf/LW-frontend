import { DashboardEmptyCTA } from 'modules/pools/ui/DashboardEmptyCTA'

import { createRoute } from 'modules/router/utils/createRoute'
import * as links from 'modules/router/links'

function RouteDashboardOldDeposits() {
  return (
    <>
      <DashboardEmptyCTA
        link={links.deposit}
        fashion="blue"
        timeText="old"
        entityName="deposits"
        actionText="Deposit"
      />
    </>
  )
}

export const routeDashboardOldDeposits = createRoute({
  component: RouteDashboardOldDeposits,
})
