import React from 'react'
import { Tooltip } from 'shared/ui/common/Tooltip'
import { Text, TextSize, TextColor } from 'shared/ui/common/Text'
import s from './InfoFieldValue.module.scss'

type Props = {
  label?: React.ReactNode
  value?: React.ReactNode
  className?: string
  valueSize?: TextSize
  valueColor?: TextColor
  isTruncated?: boolean
  sign?: React.ReactNode
}

export function InfoFieldValue({
  label,
  value,
  valueSize = 16,
  valueColor = 'default',
  className,
  isTruncated,
  sign,
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
        {isTruncated ? (
          <Tooltip tooltip={value} className={s.truncatedWrap}>
            <span className={s.truncatedValue}>{value}</span>
            {sign && (
              <>
                &nbsp;
                <span>{sign}</span>
              </>
            )}
          </Tooltip>
        ) : (
          value
        )}
      </Text>
    </div>
  )
}
