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
import { fetcherStandard } from '../utils/fetcherStandard'

export type SWRResponse<Data, Error = unknown> = SWRResponseSource<
  Data,
  Error
> & {
  isLoading: boolean
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
  fetcher: Fetcher<Data> | null = fetcherStandard,
  config?: SWRConfiguration<Data, Error>,
) => {
  const result = useSWRSource(key, fetcher, {
    ...defaultConfig,
    ...config,
  })
  return {
    ...result,
    isLoading: result.data == null && result.isValidating,
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
  return {
    ...result,
    isLoading: result.data == null && result.isValidating,
  }
}
