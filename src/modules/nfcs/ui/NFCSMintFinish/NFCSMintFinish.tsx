import { useNFCSState } from 'modules/nfcs/hooks/useNFCSState'

import { Text } from 'shared/ui/common/Text'
import { Button } from 'shared/ui/controls/Button'

import s from './NFCSMintFinish.module.scss'

type Props = {
  onClose?: () => void
}

export function NFCSMintFinish({ onClose }: Props) {
  const { nfcs } = useNFCSState()
  return (
    <>
      <Text
        size={16}
        weight={600}
        isUppercased
        isCentered
        className={s.undertitle}
      >
        Your Credit Score is generated
      </Text>
      <Text size={44} weight={700} isUppercased isCentered className={s.title}>
        Your Credit Score:
      </Text>
      <br />
      <div className={s.scoreWrap}>
        <div>{nfcs}</div>
        <Button className={s.finish} onClick={onClose}>
          Finish
        </Button>
      </div>
    </>
  )
}
