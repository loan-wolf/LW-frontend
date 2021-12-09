import cns from 'classnames'

import { Text } from 'shared/ui/common/Text'
import { Tooltip } from 'shared/ui/common/Tooltip'

import s from './FormInfoFrame.module.scss'

type InfoItem = {
  label: React.ReactNode
  value: React.ReactNode
  sign?: React.ReactNode
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
        const valueEl = item.isTooltiped ? (
          <div className={s.truncatedValueWrap}>
            <Tooltip tooltip={item.value}>
              <Text size={20} weight={500} truncateLines={1}>
                {item.value}
              </Text>
            </Tooltip>
            {item.sign && (
              <Text size={20} weight={500} className={s.sign}>
                &nbsp;{item.sign}
              </Text>
            )}
          </div>
        ) : (
          <Text size={20} weight={500}>
            {item.value}
          </Text>
        )

        return (
          <div key={i} className={s.column}>
            <Text size={14} weight={500} color="secondary">
              {item.label}
            </Text>
            {item.value ? valueEl : <>&nbsp;</>}
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
