import { useContext } from 'react'
import { currentMatchContext } from '../providers/currentMatchContext'

export function useCurrentMatch() {
  return useContext(currentMatchContext)
}
