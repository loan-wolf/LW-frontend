import cns from 'classnames'

import { Text } from 'shared/ui/common/Text'
import { Tooltip } from 'shared/ui/common/Tooltip'

import s from './FormInfoFrame.module.scss'

type InfoItem = {
  label: React.ReactNode
  value: React.ReactNode
  isTooltiped?: boolean
}

type Props = {
  info: [InfoItem, InfoItem]
  className?: string
}

export function FormInfoFrame({ info, className }: Props) {
  return (
    <div className={cns(s.wrap, className)}>
      {info.map((item, i) => {
        let valueEl = (
          <Text size={20} weight={500} truncateLines={1}>
            {item.value}
          </Text>
        )

        if (item.isTooltiped) {
          valueEl = <Tooltip tooltip={item.value}>{valueEl}</Tooltip>
        }

        return (
          <div key={i} className={s.column}>
            <Text size={14} weight={500} color="secondary">
              {item.label}
            </Text>
            {valueEl}
          </div>
        )
      })}
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
