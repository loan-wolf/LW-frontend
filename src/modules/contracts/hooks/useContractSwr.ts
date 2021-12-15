import type { SWRConfiguration } from 'swr'
import { useSWR } from 'modules/network/hooks/useSwr'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'
import { FilterAsyncMethods, UnpackedPromise } from 'shared/utils/utilTypes'

export function useContractSwr<
  C,
  M extends FilterAsyncMethods<C>,
  R extends UnpackedPromise<ReturnType<C[M]>>,
>(
  contract: C,
  method: M | false,
  params: Parameters<C[M]>,
  config?: SWRConfiguration<R, Error>,
) {
  const { chainId, walletAddress } = useWeb3()

  const cacheKeys = [
    (contract as any).address,
    String(walletAddress),
    chainId,
    method,
    ...params.map(String),
  ]

  return useSWR<R>(
    method ? cacheKeys : null,
    () => (method ? contract[method as M](...params) : null),
    config,
  )
}
