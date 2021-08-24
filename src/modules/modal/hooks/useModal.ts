import { useCallback, useContext } from 'react'
import { modalContext, ModalComponentType } from '../providers/ModalProvider'

export function useModal(modal: ModalComponentType) {
  const { openModal } = useContext(modalContext)
  return useCallback(() => openModal(modal), [openModal, modal])
}

export function getUseModal(modal: ModalComponentType) {
  return () => useModal(modal)
}
