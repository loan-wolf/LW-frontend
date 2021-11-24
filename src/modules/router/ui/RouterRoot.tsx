import { useMemo, memo } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { matchRoutes } from 'react-router-config'
import { routes } from '../routerConfig'
import {
  currentMatchBranchContext,
  currentMatchContext,
} from '../providers/currentMatchContext'
import type { MatchBranch } from '../types'

function RenderBranch({ branch }: { branch: MatchBranch }) {
  const history = useHistory()
  const [current, ...rest] = branch

  if (!current.route.component) return null

  return (
    <currentMatchContext.Provider value={current.match}>
      <current.route.component
        match={current.match}
        history={history}
        location={history.location}
        children={rest.length > 0 ? <RenderBranch branch={rest} /> : null}
      />
    </currentMatchContext.Provider>
  )
}

function RouterRootRaw() {
  const location = useLocation()
  const branch = useMemo(
    () => matchRoutes(routes, String(location.pathname)),
    [location.pathname],
  )
  return (
    <currentMatchBranchContext.Provider value={branch}>
      <RenderBranch branch={branch} />
    </currentMatchBranchContext.Provider>
  )
}

export const RouterRoot = memo(RouterRootRaw)
