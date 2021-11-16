import { Button } from 'shared/ui/controls/Button'
import { TermsHint } from 'shared/ui/common/TermsHint'

import s from './FormSubmitter.module.scss'

type Props = {
  isLocked?: boolean
  isSubmitting?: boolean
  firstStepText?: React.ReactNode
  onClickUnlock?: () => void
}

export function FormSubmitter({
  isLocked,
  isSubmitting,
  firstStepText,
  onClickUnlock,
}: Props) {
  return (
    <>
      {!isLocked && (
        <Button type="submit" fashion="secondary" isFullWidth>
          {firstStepText}
        </Button>
      )}
      {isLocked && (
        <div className={s.buttonsRow}>
          <Button fashion="glass" className={s.edit} onClick={onClickUnlock}>
            Edit
          </Button>
          <Button
            type="submit"
            fashion="default"
            className={s.confirm}
            isLoading={isSubmitting}
          >
            Confirm
          </Button>
        </div>
      )}
      <TermsHint />
    </>
  )
}
