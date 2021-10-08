import { Text } from 'shared/ui/common/Text'
import s from './Title.module.scss'

type Props = {
  children?: React.ReactNode
}

export function Title({ children }: Props) {
  return (
    <Text size={44} weight={600} className={s.title} isUppercased>
      {children}
    </Text>
  )
}
