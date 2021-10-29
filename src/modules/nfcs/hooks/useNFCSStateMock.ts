import { useSWR } from 'modules/network/hooks/useSwr'
import { useCallback } from 'react'

type MockedStateStatus = 'not-generated' | 'generating' | 'generated' | 'failed'

type MockedState = {
  nfcs: number
  status: MockedStateStatus
  txHash: string | null
}

let globalState: MockedState = {
  nfcs: -1,
  status: 'not-generated',
  txHash: null,
}

export function useNFCSStateMock() {
  const state = useSWR<MockedState>('nfcs-state-mock', () => globalState)

  const data = state.data || globalState

  const setState = useCallback(
    (nextState: Partial<MockedState>) => {
      globalState = {
        ...data,
        ...nextState,
      }
      state.mutate(globalState)
    },
    [state, data],
  )

  return [data, setState] as [MockedState, typeof setState]
}
