import cns from 'classnames'
import { Text } from 'shared/ui/common/Text'

import s from './TermsHint.module.scss'

type Props = {
  className?: string
}

export function TermsHint({ className }: Props) {
  return (
    <Text
      isCentered
      size={14}
      weight={500}
      color="secondary"
      className={cns(s.termsHint, className)}
    >
      by clicking this button you agree to the{' '}
      <a
        href="http://google.com"
        target="_blank"
        rel="noreferrer"
        className={s.termsLink}
      >
        Terms of Use
      </a>
    </Text>
  )
}
