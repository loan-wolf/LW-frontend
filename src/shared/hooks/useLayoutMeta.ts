import { useMemo } from 'react'
import { useCurrentMatch } from 'modules/router/hooks/useCurreentMatch'
import type { RouteMeta } from 'modules/router/types'

export function useLayoutMeta(): RouteMeta | undefined {
  const currentMatch = useCurrentMatch()
  return useMemo(
    () =>
      currentMatch.find(m => Boolean(m.route.routeMeta?.headerTitle))?.route
        .routeMeta,
    [currentMatch],
  )
}
