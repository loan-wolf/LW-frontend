import cns from 'classnames'

import s from './FieldError.module.scss'

type Props = {
  direction?: 'top' | 'bottom'
  children?: React.ReactNode
  className?: string
}

export function FieldError({
  className,
  children,
  direction = 'bottom',
}: Props) {
  if (!children) return null

  return (
    <div
      className={cns(s.message, className, {
        [s.toTop]: direction === 'top',
        [s.toBottom]: direction === 'bottom',
      })}
    >
      {children}
    </div>
  )
}
