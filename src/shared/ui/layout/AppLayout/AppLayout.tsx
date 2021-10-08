import cns from 'classnames'
import { useLayoutMeta } from 'shared/hooks/useLayoutMeta'

import { Title } from 'shared/ui/common/Title'
import { Drawer } from '../Drawer'
import { HeaderActions } from '../HeaderActions'

import s from './AppLayout.module.scss'

type Props = {
  children: React.ReactNode
}

export function AppLayout({ children }: Props) {
  const layoutMeta = useLayoutMeta()
  const isNarrow = layoutMeta?.layoutType === 'narrow'
  const isNarrowExtended = layoutMeta?.layoutType === 'narrow-extended'
  const headerTitle = layoutMeta?.headerTitle

  return (
    <div
      className={cns(s.appWrap, {
        [s.isNarrow]: isNarrow,
        [s.isNarrowExtended]: isNarrowExtended,
      })}
    >
      <div className={s.appInner}>
        <Drawer className={s.drawer} />
        <HeaderActions />
        <div className={s.content}>
          <Title>{headerTitle}</Title>
          {children}
        </div>
      </div>
    </div>
  )
}
