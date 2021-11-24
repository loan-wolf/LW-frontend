import cns from 'classnames'
import s from './AppWrap.module.scss'

type Props = {
  className?: string
  children?: React.ReactNode
}

export function AppWrap({ className, children }: Props) {
  return <div className={cns(s.wrap, className)}>{children}</div>
}
