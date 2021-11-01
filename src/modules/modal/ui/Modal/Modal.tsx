import { useKeyPressEvent } from 'react-use'
import { useScrollLock } from 'shared/hooks/useScrollLock'
import { Button } from 'shared/ui/controls/Button'
import { ReactComponent as CloseSVG } from 'assets/close.svg'
import s from './Modal.module.scss'

export type ModalProps = {
  onClose: () => void
}

type Props = ModalProps & {
  width?: number
  children?: React.ReactNode
}

export function Modal({ width, children, onClose }: Props) {
  useScrollLock()
  useKeyPressEvent('Escape', onClose)
  return (
    <div className={s.wrap}>
      <div className={s.scrollWrap}>
        <div className={s.overlay} onClick={onClose} />
        <Button isSquare fashion="glass" className={s.close} onClick={onClose}>
          <CloseSVG />
        </Button>
        <div
          className={s.body}
          style={width ? { maxWidth: width, width: '100%' } : undefined}
          children={children}
        />
      </div>
    </div>
  )
}
