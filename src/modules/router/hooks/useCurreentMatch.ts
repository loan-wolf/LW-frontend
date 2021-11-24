import type { match } from 'react-router'
import { useContext } from 'react'
import {
  currentMatchBranchContext,
  currentMatchContext,
} from '../providers/currentMatchContext'

export function useCurrentMatchBranch() {
  return useContext(currentMatchBranchContext)
}

export function useCurrentMatch<P = {}>() {
  return useContext(currentMatchContext) as match<P>
}
