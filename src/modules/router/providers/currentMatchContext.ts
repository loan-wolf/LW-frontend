import { createContext } from 'react'
import type { MatchBranch } from '../types'

export const currentMatchContext = createContext<MatchBranch>([])
