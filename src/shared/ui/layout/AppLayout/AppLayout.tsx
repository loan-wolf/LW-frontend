import cns from 'classnames'
import { useLayoutMeta } from 'shared/hooks/useLayoutMeta'

import { AppWrap } from '../AppWrap'
import { AppInner } from '../AppInner'
import { Drawer } from '../Drawer'
import { Title } from 'shared/ui/common/Title'
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
    <AppWrap
      className={cns(s.wrap, {
        [s.isNarrow]: isNarrow,
        [s.isNarrowExtended]: isNarrowExtended,
      })}
    >
      <AppInner className={s.appInner}>
        <Drawer className={s.drawer} />
        <HeaderActions />
        <div className={s.content}>
          <Title>{headerTitle}</Title>
          {children}
        </div>
      </AppInner>
    </AppWrap>
  )
}
