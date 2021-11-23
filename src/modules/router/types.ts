import type * as H from 'history'
import type { match } from 'react-router'
import type { MatchedRoute } from 'react-router-config'

export type RouteProps<P = {}> = {
  match: match<P>
  history: H.History
  location: H.Location
  children: React.ReactNode
}

export type MatchBranch = MatchedRoute<{}>[]

export type RouteMeta = {
  headerTitle?: string
  layoutType?: 'default' | 'narrow' | 'narrow-extended'
}
