import { useSWR } from 'modules/network/hooks/useSwr'
import { useCallback } from 'react'

type MockedStateStatus = 'not-generated' | 'generating' | 'generated'

type MockedState = {
  nfcs: number
  status: MockedStateStatus
}

let globalState: MockedState = {
  nfcs: -1,
  status: 'not-generated',
}

export function useNFCSStateMock() {
  const state = useSWR<MockedState>('nfcs-state-mock', () => globalState)

  const data = state.data!

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
