import { Web3Provider } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { parseChainId } from '../chains'
import { DEFAULT_CHAIN } from 'config'

export function useWeb3() {
  const web3 = useWeb3React<Web3Provider>()
  const currentChain = web3.chainId || DEFAULT_CHAIN
  return {
    ...web3,
    isWalletConnected: web3.active,
    walletAddress: web3.account,
    chainId: parseChainId(currentChain),
  }
}
