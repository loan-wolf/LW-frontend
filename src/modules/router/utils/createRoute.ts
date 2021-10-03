import { RouteMeta } from '../types'

type Args = RouteMeta & {
  component: React.ComponentType
}

export function createRoute({ component, ...routeMeta }: Args) {
  return {
    component,
    routeMeta,
  }
}
