import cns from 'classnames'
import { Text } from 'shared/ui/common/Text'
// eslint-disable-next-line css-modules/no-unused-class
import s from './Tooltip.module.scss'

export type Position =
  | 'top-left'
  | 'top'
  | 'top-right'
  | 'bottom-left'
  | 'bottom'
  | 'bottom-right'

type Props = {
  position?: Position
  tooltip?: React.ReactNode
  maxWidth?: number
  className?: string
  classNameBody?: string
  children?: React.ReactNode
}

export function Tooltip({
  position = 'top',
  tooltip,
  maxWidth,
  className,
  classNameBody,
  children,
}: Props) {
  return (
    <div className={cns(s.wrap, className)}>
      {children}
      <div
        style={{ maxWidth }}
        className={cns(s.body, classNameBody, s[`position--${position}`], {
          [s.isBreaking]: maxWidth !== undefined,
        })}
      >
        <Text size={12} weight={500} children={tooltip} />
      </div>
    </div>
  )
}
