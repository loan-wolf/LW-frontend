import cns from 'classnames'
import { Text } from 'shared/ui/common/Text'
import s from './InputMaxAction.module.scss'

type Props = {
  onClick?: React.MouseEventHandler
  className?: string
}

export function InputMaxAction({ onClick, className }: Props) {
  return (
    <Text
      size={12}
      weight={500}
      color="greenapple"
      isUppercased
      onClick={onClick}
      className={cns(s.inputMaxAction, className)}
    >
      MAX
    </Text>
  )
}
