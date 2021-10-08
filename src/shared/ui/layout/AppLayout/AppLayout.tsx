import cns from 'classnames'
import { useLayoutMeta } from 'shared/hooks/useLayoutMeta'

import { Header } from '../Header'
import { Drawer } from '../Drawer'

import s from './AppLayout.module.scss'

type Props = {
  children: React.ReactNode
}

export function AppLayout({ children }: Props) {
  const layoutMeta = useLayoutMeta()
  const isNarrow = layoutMeta?.layoutType === 'narrow'
  const headerTitle = layoutMeta?.headerTitle

  return (
    <div className={s.appWrap}>
      <div className={s.appInner}>
        <div className={s.drawer}>
          <Drawer />
        </div>
        <div className={cns(s.content, { [s.isNarrow]: isNarrow })}>
          <Header
            title={headerTitle}
            isNarrow={isNarrow}
            className={s.header}
          />
          <div className={s.contentInner}>
            <div className={s.contentBox}>{children}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
