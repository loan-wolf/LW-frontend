import { memo, useEffect } from 'react'
import { RouteChildrenProps, useHistory, withRouter } from 'react-router-dom'
import {
  setScrollPosition,
  saveScrollHistory,
  restoreScrollHistory,
} from 'shared/utils/scrollUtils'

export function ScrollRestoratorRaw() {
  const { location } = useHistory()
  useEffect(() => {
    restoreScrollHistory(String(location.key))
  }, [location.key])
  return null
}

export const ScrollRestorator = withRouter(
  memo(
    ScrollRestoratorRaw,
    (prevProps: RouteChildrenProps, nextProps: RouteChildrenProps) => {
      const { location: prev, history } = prevProps
      const { location: next } = nextProps

      const isLocationChanged =
        (next.pathname !== prev.pathname || next.search !== prev.search) &&
        next.hash === ''

      if (isLocationChanged) {
        if (history.action !== 'POP') {
          setScrollPosition(0)
        }
        const key = String(prev.key)
        saveScrollHistory(key)
      }

      return false
    },
  ),
)
