import cns from 'classnames'
import s from './ButtonsRow.module.scss'

type Props = {
  isCentered?: boolean
  children?: React.ReactNode
  className?: string
}

export function ButtonsRow({ isCentered, children, className }: Props) {
  return (
    <div
      className={cns(s.buttonsRow, className, { [s.isCentered]: isCentered })}
    >
      {children}
    </div>
  )
}
