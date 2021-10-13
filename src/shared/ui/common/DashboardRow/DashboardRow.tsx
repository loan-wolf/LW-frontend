import cns from 'classnames'
import s from './DashboardRow.module.scss'

type Props = {
  className?: string
  children?: React.ReactNode
}

export function DashboardRow({ className, children }: Props) {
  return <div className={cns(s.dashboardRow, className)}>{children}</div>
}
