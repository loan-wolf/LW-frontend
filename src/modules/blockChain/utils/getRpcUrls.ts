import { Chains, getChainName, parseChainId } from '../chains'
import { INFURA_API_KEY, ALCHEMY_API_KEY, API_PATH } from 'config'

const getName = (chainId: Chains) => getChainName(chainId).toLocaleLowerCase()

export const getInfuraRpcUrl = (chainId: Chains) =>
  `https://${getName(chainId)}.infura.io/v3/${INFURA_API_KEY}`

export const getAlchemyRpcUrl = (chainId: Chains) =>
  `https://eth-${getName(chainId)}.alchemyapi.io/v2/${ALCHEMY_API_KEY}`

export const getRpcJsonUrls = (chainId: Chains): string[] => {
  const urls = []

  if (INFURA_API_KEY) urls.push(getInfuraRpcUrl(chainId))
  if (ALCHEMY_API_KEY) urls.push(getAlchemyRpcUrl(chainId))

  if (!urls.length) {
    throw new Error(
      'There are no API keys in env. Please, check your configuration',
    )
  }

  return urls
}

export const getRpcUrl = (chainId: Chains) =>
  `${API_PATH ?? ''}/api/rpc?chainId=${parseChainId(chainId)}`
