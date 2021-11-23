import cns from 'classnames'
import s from './AppInner.module.scss'

type Props = {
  className?: string
  children?: React.ReactNode
}

export function AppInner({ className, children }: Props) {
  return <div className={cns(s.appInner, className)}>{children}</div>
}
