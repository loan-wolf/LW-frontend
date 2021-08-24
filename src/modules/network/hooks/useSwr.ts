import { toastError } from 'modules/toasts'
import {
  default as useSWRSource,
  useSWRInfinite as useSWRInfiniteSource,
  SWRResponse as SWRResponseSource,
  SWRConfiguration,
} from 'swr'
import {
  Key,
  KeyLoader,
  Fetcher,
  SWRInfiniteConfiguration,
} from 'swr/dist/types'

export type SWRResponse<Data, Error = unknown> = SWRResponseSource<
  Data,
  Error
> & {
  initialLoading: boolean
}

const defaultConfig = {
  onError: (error: any) => {
    console.error(error)
    toastError(error)
  },
  errorRetryInterval: 10_000,
  focusThrottleInterval: 10_000,
}

export const useSWR = <Data = unknown, Error = unknown>(
  key: Key,
  fetcher: Fetcher<Data> | null,
  config?: SWRConfiguration<Data, Error>,
) => {
  const result = useSWRSource(key, fetcher, {
    ...defaultConfig,
    ...config,
  })
  const initialLoading = result.data == null && result.isValidating
  return {
    ...result,
    initialLoading,
  }
}

export const useSWRInfinite = <Data = unknown, Error = unknown>(
  getKey: KeyLoader<Data>,
  fetcher: Fetcher<Data>,
  config?: SWRInfiniteConfiguration<Data, Error>,
) => {
  const result = useSWRInfiniteSource(getKey, fetcher, {
    ...defaultConfig,
    ...config,
  })
  const initialLoading = result.data == null && result.isValidating
  return {
    ...result,
    initialLoading,
  }
}
