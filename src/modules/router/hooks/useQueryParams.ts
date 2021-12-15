import qs from 'qs'
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

export function useQueryParams() {
  const { search } = useLocation()
  return useMemo(() => qs.parse(search, { ignoreQueryPrefix: true }), [search])
}
