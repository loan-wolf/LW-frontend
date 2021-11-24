import { RouteMeta, RouteProps } from '../types'

type Args<P = {}> = RouteMeta & {
  component: React.ComponentType<RouteProps<P>>
}

export function createRoute<P>({ component, ...routeMeta }: Args<P>) {
  return {
    component,
    routeMeta,
  }
}
