import cns from 'classnames'
import { Text, TextColor } from 'shared/ui/common/Text'
import s from './ConnectButton.module.scss'

export type Props = {
  textColor?: TextColor
  icon: React.ReactNode
  children: React.ReactNode
  onClick: React.MouseEventHandler
  className?: string
}

export function ConnectButton(props: Props) {
  const { textColor, icon, onClick, children, className } = props

  return (
    <button onClick={onClick} className={cns(s.connectButton, className)}>
      <div className={s.icon}>{icon}</div>
      <Text size={16} weight={500} color={textColor}>
        {children}
      </Text>
    </button>
  )
}
