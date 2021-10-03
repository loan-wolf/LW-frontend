import { MatchedRoute } from 'react-router-config'

export type MatchBranch = MatchedRoute<{}>[]

export type RouteMeta = {
  headerTitle?: string
}
