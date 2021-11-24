import { useMemo } from 'react'
import { useCurrentMatchBranch } from 'modules/router/hooks/useCurreentMatch'
import type { RouteMeta } from 'modules/router/types'

export function useLayoutMeta(): RouteMeta | undefined {
  const currentMatch = useCurrentMatchBranch()
  return useMemo(
    () =>
      currentMatch.find(m => Boolean(m.route.routeMeta?.headerTitle))?.route
        .routeMeta,
    [currentMatch],
  )
}
