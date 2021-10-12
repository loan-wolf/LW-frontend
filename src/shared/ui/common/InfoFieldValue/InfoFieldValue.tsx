import { Text } from 'shared/ui/common/Text'
import s from './InfoFieldValue.module.scss'

type Props = {
  label?: React.ReactNode
  value?: React.ReactNode
}

export function InfoFieldValue({ label, value }: Props) {
  return (
    <div>
      <Text
        size={12}
        weight={500}
        isUppercased
        color="secondary"
        className={s.label}
      >
        {label}
      </Text>
      <Text size={16} weight={500} isUppercased className={s.value}>
        {value}
      </Text>
    </div>
  )
}