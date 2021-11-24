import cns from 'classnames'

import { Link } from 'shared/ui/controls/Link'
import { ReactComponent as Logo } from 'assets/logo.svg'

import s from './DrawerLogo.module.scss'

type Props = {
  link?: string
  className?: string
}

export function DrawerLogo({ link, className }: Props) {
  const props = {
    className: cns(s.logo, className),
    children: <Logo />,
  }

  if (link) {
    return <Link to={link} {...props} />
  }

  return <div {...props} />
}
