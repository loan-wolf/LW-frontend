import cns from 'classnames'

import { Link } from 'react-router-dom'
import { Text } from 'shared/ui/common/Text'

import s from './DashboardEmptyCTA.module.scss'

type Props = {
  link: string
  timeText: string
  entityName: string
  actionText: string
  fashion: 'blue' | 'green' | 'purple'
}

export function DashboardEmptyCTA({
  link,
  timeText,
  entityName,
  actionText,
  fashion,
}: Props) {
  return (
    <div className={s.wrap}>
      <div className={s.title}>
        <Text tag="span" isUppercased weight={600}>
          You don’t have {timeText} <br /> {entityName}{' '}
        </Text>
        <Text tag="span" isUppercased weight={600} color="secondary">
          at the moment
        </Text>
      </div>
      <Link
        to={link}
        className={cns(s.button, {
          [s.isBlue]: fashion === 'blue',
          [s.isGreen]: fashion === 'green',
          [s.isPurple]: fashion === 'purple',
        })}
      >
        {actionText}
      </Link>
    </div>
  )
}
