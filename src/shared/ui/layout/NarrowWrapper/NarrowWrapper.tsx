import cns from 'classnames'
import s from './NarrowWrapper.module.scss'

type Props = {
  className?: string
  isCentered?: boolean
  children?: React.ReactNode
}

export function NarrowWrapper({ className, isCentered, children }: Props) {
  return (
    <div className={cns(s.wrap, className, { [s.isCentered]: isCentered })}>
      {children}
    </div>
  )
}
