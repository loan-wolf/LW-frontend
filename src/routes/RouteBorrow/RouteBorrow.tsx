import { createRoute } from 'modules/router/utils/createRoute'

function RouteBorrow() {
  return <div>Borrow</div>
}

export const routeBorrow = createRoute({
  headerTitle: 'Borrow',
  component: RouteBorrow,
})
