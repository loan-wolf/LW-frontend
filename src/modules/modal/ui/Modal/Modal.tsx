import { useLockBodyScroll } from 'react-use'
import s from './Modal.module.scss'

export type ModalProps = {
  onClose: () => void
}

type Props = ModalProps & {
  width?: number
  children?: React.ReactNode
}

export function Modal({ width, children, onClose }: Props) {
  useLockBodyScroll()
  return (
    <div className={s.wrap}>
      <div className={s.overlay} onClick={onClose} />
      <div
        className={s.body}
        style={width ? { maxWidth: width, width: '100%' } : undefined}
        children={children}
      />
    </div>
  )
}
