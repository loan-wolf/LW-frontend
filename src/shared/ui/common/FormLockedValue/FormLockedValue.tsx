import cns from 'classnames'
import { useFormContext } from 'react-hook-form'
import { Text, TextSize } from 'shared/ui/common/Text'
import s from './FormLockedValue.module.scss'

type PlainProps = {
  label: React.ReactNode
  name: string
  getIcon?: (val: string) => React.ReactNode
  formatValue?: (val: string) => React.ReactNode
  valueSize?: TextSize
  className?: string
}

export function FormLockedValue({
  label,
  name,
  getIcon,
  formatValue,
  valueSize,
  className,
}: PlainProps) {
  const { watch } = useFormContext()
  const value = watch(name)
  const formattedValue = formatValue ? formatValue(value) : value

  const labelEl = (
    <Text size={12} weight={500} isUppercased color="secondary">
      {label}
    </Text>
  )

  if (getIcon) {
    return (
      <div className={cns(s.wrap, className)}>
        <div>
          {labelEl}
          <Text size={valueSize || 16} weight={500}>
            {formattedValue}
          </Text>
        </div>
        <div className={s.icon}>{getIcon(value)}</div>
      </div>
    )
  }

  return (
    <div className={cns(s.wrap, className)}>
      {labelEl}
      <Text size={valueSize || 28} weight={500}>
        {formattedValue}
      </Text>
    </div>
  )
}

type ListProps = {
  className?: string
  children?: React.ReactNode
}

export function FormLockedValuesList({ className, children }: ListProps) {
  return <div className={cns(s.list, className)}>{children}</div>
}
