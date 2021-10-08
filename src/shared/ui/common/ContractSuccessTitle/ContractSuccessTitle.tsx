import { Text } from 'shared/ui/common/Text'
import { Link } from 'shared/ui/controls/Link'
import * as links from 'modules/router/links'
import s from './RouteBorrow.module.scss'

type Props = {
  children?: React.ReactNode
}

export function ContractSuccessTitle({ children }: Props) {
  return (
    <Text size={16} weight={600} isUppercased className={s.title}>
      {children}{' '}
      <Link className={s.link} to={links.dashboard}>
        view it in dashboard
      </Link>
    </Text>
  )
}
