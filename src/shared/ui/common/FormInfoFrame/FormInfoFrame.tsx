import cns from 'classnames'
import { Text } from 'shared/ui/common/Text'

import s from './FormInfoFrame.module.scss'

type InfoItem = {
  label: React.ReactNode
  value: React.ReactNode
}

type Props = {
  info: [InfoItem, InfoItem]
  className?: string
}

export function FormInfoFrame({ info, className }: Props) {
  return (
    <div className={cns(s.wrap, className)}>
      {info.map((item, i) => (
        <div key={i} className={s.column}>
          <Text size={14} weight={500} color="secondary">
            {item.label}
          </Text>
          <Text size={20} weight={500}>
            {item.value}
          </Text>
        </div>
      ))}
    </div>
  )
}

type ListProps = {
  className?: string
  children?: React.ReactNode
}

export function FormInfoFramesList({ className, children }: ListProps) {
  return <div className={cns(s.list, className)}>{children}</div>
}
