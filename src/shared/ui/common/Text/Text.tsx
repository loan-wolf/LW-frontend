import cns from 'classnames'
import s from './Text.module.scss'

export type TextSize = 12 | 14 | 16 | 18
export type TextWeight = 300 | 500 | 800

type Props = {
  size: TextSize
  weight?: TextWeight
  truncateLines?: number
  isCentered?: boolean
  children: React.ReactNode
  className?: string
}

export function Text({
  size,
  weight = 500,
  truncateLines,
  isCentered,
  children,
  className,
}: Props) {
  const isTruncateOne = truncateLines && truncateLines === 1
  const isTruncateMany = truncateLines && truncateLines > 1
  return (
    <div
      style={{
        fontSize: size,
        fontWeight: weight,
        ...(isTruncateMany ? { WebkitLineClamp: truncateLines } : {}),
      }}
      className={cns(s.text, className, {
        [s.isCentered]: isCentered,
        [s.truncateOne]: isTruncateOne,
        [s.truncateOne]: isTruncateMany,
      })}
    >
      {children}
    </div>
  )
}
