import cns from 'classnames'
import s from './Text.module.scss'

export type TextSize = 12 | 14 | 16 | 18 | 20 | 24 | 28 | 36 | 44
export type TextWeight = 400 | 500 | 600 | 700
export type TextColor =
  | 'default'
  | 'secondary'
  | 'branded'
  | 'greenapple'
  | 'inherit'

export type TextParams = {
  size?: TextSize
  weight?: TextWeight
  color?: TextColor
  isUppercased?: boolean
}

type Props = TextParams & {
  tag?: 'div' | 'span'
  truncateLines?: number
  isCentered?: boolean
  children: React.ReactNode
  onClick?: React.MouseEventHandler
  className?: string
}

export function Text({
  tag = 'div',
  size,
  color = 'default',
  weight = 500,
  truncateLines,
  isCentered,
  isUppercased,
  children,
  onClick,
  className,
}: Props) {
  const Tag = tag
  const isTruncateOne = truncateLines && truncateLines === 1
  const isTruncateMany = truncateLines && truncateLines > 1
  return (
    <Tag
      onClick={onClick}
      style={{
        ...(isTruncateMany ? { WebkitLineClamp: truncateLines } : {}),
      }}
      className={cns(
        s.text,
        className,
        s[`size--${size}`],
        s[`color--${color}`],
        s[`weight--${weight}`],
        {
          [s.isCentered]: isCentered,
          [s.isUppercased]: isUppercased,
          [s.truncateOne]: isTruncateOne,
          [s.truncateMany]: isTruncateMany,
        },
      )}
    >
      {children}
    </Tag>
  )
}
