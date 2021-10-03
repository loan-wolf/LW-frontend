import { Header } from '../Header'
import { Drawer } from '../Drawer'

import s from './AppLayout.module.scss'

type Props = {
  children: React.ReactNode
}

export function AppLayout({ children }: Props) {
  return (
    <div className={s.appWrap}>
      <div className={s.appInner}>
        <div className={s.drawer}>
          <Drawer />
        </div>
        <div className={s.content}>
          <Header title="Markets" className={s.header} />
          {children}
        </div>
      </div>
    </div>
  )
}
