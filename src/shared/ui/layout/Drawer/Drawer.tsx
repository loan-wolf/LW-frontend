import cns from 'classnames'
import { memo, useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import { Link } from 'shared/ui/controls/Link'

import { ReactComponent as Logo } from 'assets/logo.svg'
import { ReactComponent as Markets } from 'assets/markets.svg'
import { ReactComponent as Deposit } from 'assets/lend.svg'
import { ReactComponent as Borrow } from 'assets/borrow.svg'
import { ReactComponent as Dashboard } from 'assets/dashboard.svg'
import { ReactComponent as Analytics } from 'assets/analytics.svg'

import s from './Drawer.module.scss'
import * as links from 'modules/router/links'

type DrawerLinkProps = {
  link: string
  matchLinks?: string[]
  icon: React.ReactNode
  children: React.ReactNode
}

function DrawerLinkRaw({ link, matchLinks, icon, children }: DrawerLinkProps) {
  const { pathname } = useLocation()

  const isActive = useMemo(
    () => pathname === link || matchLinks?.includes(pathname),
    [link, matchLinks, pathname],
  )

  return (
    <Link
      to={link}
      className={cns(s.drawerLink, {
        [s.isActive]: isActive,
      })}
    >
      <span className={s.linkIcon}>{icon}</span>
      <span>{children}</span>
    </Link>
  )
}

const DrawerLink = memo(DrawerLinkRaw)

const MATCH_LINKS = {
  DASHBOARD: [
    links.dashboardCollateral,
    links.dashboardDeposits,
    links.dashboardLoans,
    links.dashboardOldDeposits,
    links.dashboardOldLoans,
  ],
}

type Props = {
  className?: string
}

function DrawerRaw({ className }: Props) {
  return (
    <div className={className}>
      <Link to={links.home} className={s.drawerLogo}>
        <Logo />
      </Link>

      <DrawerLink link={links.markets} icon={<Markets />} children="Markets" />
      <DrawerLink link={links.deposit} icon={<Deposit />} children="Deposit" />
      <DrawerLink link={links.borrow} icon={<Borrow />} children="Borrow" />
      <DrawerLink
        link={links.dashboard}
        matchLinks={MATCH_LINKS.DASHBOARD}
        icon={<Dashboard />}
        children="Dashboard"
      />
      <DrawerLink
        link={links.analytics}
        icon={<Analytics />}
        children={
          <>
            Protocol
            <br />
            analytics
          </>
        }
      />
    </div>
  )
}

export const Drawer = memo(DrawerRaw)
