import { createRoute } from 'modules/router/utils/createRoute'

function RouteDashboard() {
  return <div>Dashboard</div>
}

export const routeDashboard = createRoute({
  headerTitle: 'Dashboard',
  component: RouteDashboard,
})
