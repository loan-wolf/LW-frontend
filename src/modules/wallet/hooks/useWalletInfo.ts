import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'

export function useWalletInfo() {
  const web3 = useWeb3()

  return {
    isWalletConnected: web3.active,
    walletAddress: web3.account,
  }
}
