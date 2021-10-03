import { Text } from 'shared/ui/common/Text'
import s from './ConnectButton.module.scss'

export type Props = {
  icon: React.ReactNode
  children: React.ReactNode
  onClick: React.MouseEventHandler
}

export function ConnectButton(props: Props) {
  const { icon, onClick, children } = props

  return (
    <button onClick={onClick} className={s.connectButton}>
      <div className={s.icon}>{icon}</div>
      <Text size={16} weight={500}>
        {children}
      </Text>
    </button>
  )
}
