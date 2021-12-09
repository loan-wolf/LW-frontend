import cns from 'classnames'
import React from 'react'

import { Text } from 'shared/ui/common/Text'
import { Tooltip } from 'shared/ui/common/Tooltip'

import s from './FormInfoFrame.module.scss'

type ItemProps = {
  label: React.ReactNode
  value: React.ReactNode
  sign?: React.ReactNode
  isTooltiped?: boolean
}

export function FormInfoItem({ label, value, sign, isTooltiped }: ItemProps) {
  const valueEl = isTooltiped ? (
    <div className={s.truncatedValueWrap}>
      <Tooltip tooltip={value}>
        <Text size={20} weight={500} truncateLines={1}>
          {value}
        </Text>
      </Tooltip>
      {sign && (
        <Text size={20} weight={500} className={s.sign}>
          &nbsp;{sign}
        </Text>
      )}
    </div>
  ) : (
    <Text size={20} weight={500}>
      {value}
    </Text>
  )

  return (
    <div className={s.column}>
      <Text size={14} weight={500} color="secondary">
        {label}
      </Text>
      {value ? valueEl : <>&nbsp;</>}
    </div>
  )
}

type Props = {
  children: React.ReactNode
  className?: string
}

export function FormInfoFrame({ className, children }: Props) {
  return <div className={cns(s.wrap, className)}>{children}</div>
}

type ListProps = {
  className?: string
  children?: React.ReactNode
}

export function FormInfoFramesList({ className, children }: ListProps) {
  return <div className={cns(s.list, className)}>{children}</div>
}
