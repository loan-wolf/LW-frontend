import { Text } from 'shared/ui/common/Text'
import { Button } from 'shared/ui/controls/Button'
import { ReactComponent as TimeSVG } from 'assets/time.svg'

import s from './NFCSMintProgress.module.scss'

type Props = {
  onClose?: () => void
}

export function NFCSMintProgress({ onClose }: Props) {
  return (
    <>
      <Text size={44} weight={700} isUppercased isCentered className={s.title}>
        Mint NFCS
      </Text>

      <div className={s.timerWrapOuter}>
        <div className={s.timerSpacer} />
        <div className={s.timerWrapInner}>
          <TimeSVG />
        </div>
        <Text
          size={16}
          weight={600}
          color="secondary"
          isUppercased
          isCentered
          className={s.timerHint}
        >
          Please wait
        </Text>
      </div>

      <Text size={16} weight={600} isUppercased isCentered className={s.text}>
        Your Credit Score is generating
      </Text>

      <Button
        size={60}
        fashion="glass"
        className={s.closeButton}
        onClick={onClose}
      >
        Close
      </Button>
    </>
  )
}
