import cns from 'classnames'
import s from './Text.module.scss'

export type TextSize = 12 | 14 | 16 | 18 | 20 | 44
export type TextWeight = 400 | 500 | 600 | 700
export type TextColor = 'default' | 'secondary' | 'branded' | 'inherit'

type Props = {
  size: TextSize
  color?: TextColor
  weight?: TextWeight
  truncateLines?: number
  isCentered?: boolean
  isUppercased?: boolean
  children: React.ReactNode
  className?: string
}

export function Text({
  size,
  color = 'default',
  weight = 500,
  truncateLines,
  isCentered,
  isUppercased,
  children,
  className,
}: Props) {
  const isTruncateOne = truncateLines && truncateLines === 1
  const isTruncateMany = truncateLines && truncateLines > 1
  return (
    <div
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
    </div>
  )
}
