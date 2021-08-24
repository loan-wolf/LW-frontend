import { Button } from 'shared/ui/common/Button'
import s from './ConnectButton.module.scss'

export type Props = {
  iconSrc: string
  children: React.ReactNode
  onClick: React.MouseEventHandler
}

export function ConnectButton(props: Props) {
  const { iconSrc, onClick, children } = props

  return (
    <Button onClick={onClick} isFullWidth className={s.connectButton}>
      <div className={s.connectButtonInner}>
        <span>{children}</span>
        <img src={iconSrc} alt="" />
      </div>
    </Button>
  )
}
