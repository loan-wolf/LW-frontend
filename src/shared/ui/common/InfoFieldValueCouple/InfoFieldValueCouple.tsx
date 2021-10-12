import cns from 'classnames'
import s from './InfoFieldValueCouple.module.scss'

type Props = {
  className?: string
  children?: React.ReactNode
}

export function InfoFieldValueCouple({ className, children }: Props) {
  return <div className={cns(s.wrap, className)}>{children}</div>
}
