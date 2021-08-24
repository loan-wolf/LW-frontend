import { Chains, parseChainId } from 'modules/blockChain/chains'

export const API_PATH = process.env.REACT_APP_API_PATH

export const DEFAULT_CHAIN: Chains = parseChainId(
  process.env.REACT_APP_DEFAULT_CHAIN || '',
)

export const SUPPORTED_CHAINS: Chains[] = (
  process.env.REACT_APP_SUPPORTED_CHAINS || ''
)
  .split(',')
  .map(parseChainId)

export const INFURA_API_KEY = process.env.REACT_APP_INFURA_API_KEY
export const ALCHEMY_API_KEY = process.env.REACT_APP_ALCHEMY_API_KEY

export const LS_PREFIX = 'loan-wolf'
