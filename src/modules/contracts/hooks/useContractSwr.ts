import { useSWR } from 'modules/network/hooks/useSwr'
import { useWalletInfo } from 'modules/wallet/hooks/useWalletInfo'
import { useCurrentChain } from 'modules/blockChain/hooks/useCurrentChain'
import { FilterMethods, UnpackedPromise } from 'shared/utils/utilTypes'

export const useContractSwr = <
  Contract,
  Method extends FilterMethods<Contract>,
>(
  contract: Contract | undefined | null,
  method: Method | null,
  ...params: Parameters<Contract[Method]>
) => {
  const chainId = useCurrentChain()
  const { walletAddress } = useWalletInfo()

  const cacheKeys = [
    (contract as any).address,
    String(walletAddress),
    chainId,
    method,
    ...params.map(String),
  ]

  return useSWR<UnpackedPromise<ReturnType<Contract[Method]>>>(
    method !== null && contract ? cacheKeys : null,
    () => (method !== null && contract ? contract[method](...params) : null),
  )
}
