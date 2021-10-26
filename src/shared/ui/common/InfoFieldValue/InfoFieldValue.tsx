import { Text, TextSize, TextColor } from 'shared/ui/common/Text'
import s from './InfoFieldValue.module.scss'

type Props = {
  label?: React.ReactNode
  value?: React.ReactNode
  className?: string
  valueSize?: TextSize
  valueColor?: TextColor
}

export function InfoFieldValue({
  label,
  value,
  valueSize = 16,
  valueColor = 'default',
  className,
}: Props) {
  return (
    <div className={className}>
      <Text
        size={12}
        weight={500}
        isUppercased
        color="secondary"
        className={s.label}
      >
        {label}
      </Text>
      <Text
        color={valueColor}
        size={valueSize}
        weight={500}
        isUppercased
        className={s.value}
      >
        {value}
      </Text>
    </div>
  )
}
