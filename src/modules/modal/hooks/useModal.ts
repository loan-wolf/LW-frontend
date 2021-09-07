import { useCallback, useContext, useMemo } from 'react'
import { modalContext, ModalComponentType } from '../providers/ModalProvider'

export function useModal<P>(modal: ModalComponentType<P>) {
  const { openModal, closeModal } = useContext(modalContext)

  const open = useCallback(
    (props: P) => openModal(modal, props),
    [openModal, modal],
  )

  const close = useCallback(() => closeModal(modal), [closeModal, modal])

  return useMemo(() => ({ open, close }), [open, close])
}

export function getUseModal<P>(modal: ModalComponentType<P>) {
  return () => useModal(modal)
}
