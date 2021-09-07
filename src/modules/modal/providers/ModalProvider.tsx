import { memo, useMemo, useCallback, createContext, useRef } from 'react'
import { useUpdate } from 'react-use'
import type { ModalProps } from '../ui/Modal'

export type ModalComponentType<P> = React.ComponentType<ModalProps & P>

type ModalContextValue = {
  openModal: <P>(modal: ModalComponentType<P>, props: P) => void
  closeModal: <P>(modal: ModalComponentType<P>) => void
}

export const modalContext = createContext({} as ModalContextValue)

type Props = {
  children?: React.ReactNode
}

function ModalProviderRaw({ children }: Props) {
  const update = useUpdate()

  const stateRef = useRef<{
    modal: React.ComponentType<any>
    props: any
  } | null>(null)

  const openModal = useCallback(
    function <P>(modal: ModalComponentType<P>, props: P) {
      stateRef.current = { modal, props }
      update()
    },
    [update],
  )

  const closeModal = useCallback(
    function <P>(modal?: ModalComponentType<P>) {
      if (modal && modal !== stateRef.current?.modal) return
      stateRef.current = null
      update()
    },
    [update],
  )

  const context = useMemo(
    () => ({
      openModal,
      closeModal,
    }),
    [openModal, closeModal],
  )

  const handleClose = useCallback(() => closeModal(), [closeModal])

  return (
    <modalContext.Provider value={context}>
      {children}
      {stateRef.current && (
        <stateRef.current.modal
          onClose={handleClose}
          {...stateRef.current.props}
        />
      )}
    </modalContext.Provider>
  )
}

export const ModalProvider = memo(ModalProviderRaw)
