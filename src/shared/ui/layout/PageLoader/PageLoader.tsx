import cns from 'classnames'
import { ReactComponent as LoaderSVG } from 'assets/loader.svg'
import s from './PageLoader.module.scss'

type Props = {
  className?: string
}

export function PageLoader({ className }: Props) {
  return (
    <div className={cns(s.pageLoaderWrap, className)}>
      <LoaderSVG />
    </div>
  )
}
