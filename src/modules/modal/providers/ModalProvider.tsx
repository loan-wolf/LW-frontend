import { memo, useMemo, useCallback, createContext, useRef } from 'react'
import { useUpdate } from 'react-use'
import type { ModalProps } from '../ui/Modal'

export type ModalComponentType = React.ComponentType<ModalProps>

type ModalContextValue = {
  openModal: (modal: ModalComponentType) => void
}

export const modalContext = createContext({} as ModalContextValue)

type Props = {
  children?: React.ReactNode
}

function ModalProviderRaw({ children }: Props) {
  const stateRef = useRef(null as ModalComponentType | null)
  const update = useUpdate()

  const openModal = useCallback(
    (modal: ModalComponentType) => {
      stateRef.current = modal
      update()
    },
    [update],
  )

  const closeModal = useCallback(() => {
    stateRef.current = null
    update()
  }, [update])

  const context = useMemo(
    () => ({
      openModal,
      closeModal,
    }),
    [openModal, closeModal],
  )

  return (
    <modalContext.Provider value={context}>
      {children}
      {stateRef.current && <stateRef.current onClose={closeModal} />}
    </modalContext.Provider>
  )
}

export const ModalProvider = memo(ModalProviderRaw)
