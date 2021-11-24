import type { match } from 'react-router'
import { createContext } from 'react'
import type { MatchBranch } from '../types'

export const currentMatchBranchContext = createContext<MatchBranch>([])

export const currentMatchContext = createContext<match>(null as any)
