import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'
import { useSWR } from 'modules/network/hooks/useSwr'

export function usePermittedAddresses() {
  const { account, active, chainId, library } = useWeb3()
  return useSWR<string[]>(
    `accounts-${account}-${active}-${chainId}`,
    async () => {
      if (!library) return []
      const permissions = await library.send('wallet_getPermissions', [])
      const accounts = permissions[0].caveats.find(
        (c: any) => c.type === 'filterResponse',
      ).value
      return accounts
    },
  )
}
