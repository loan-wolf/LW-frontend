import cns from 'classnames'

import { useNFCSModal } from 'modules/nfcs/ui/NFCSModal/useNFCSModal'
import { useWalletInfo } from 'modules/wallet/hooks/useWalletInfo'
import { useNFCSStateMock } from 'modules/nfcs/hooks/useNFCSStateMock'

import { Text } from 'shared/ui/common/Text'
import { Button } from 'shared/ui/controls/Button'
import { ReactComponent as BoltSVG } from 'assets/bolt.svg'
import { ReactComponent as TimeSVG } from 'assets/time.svg'

import s from './HeaderNFCS.module.scss'

type Props = {
  className?: string
}

export function HeaderNFCS({ className }: Props) {
  const modalNFCS = useNFCSModal()
  const { isWalletConnected } = useWalletInfo()
  const [stateMock] = useNFCSStateMock()

  if (!isWalletConnected) {
    return null
  }

  if (stateMock.status === 'not-generated') {
    return (
      <div
        className={cns(s.wrap, s.generateWrap, className)}
        onClick={modalNFCS.open}
      >
        <Button
          size={40}
          isSquare
          fashion="glass-branded"
          className={s.generateButton}
        >
          <BoltSVG />
        </Button>
        <Text size={12} weight={500} isUppercased color="branded">
          Generate <br />
          credit score
        </Text>
      </div>
    )
  }

  if (stateMock.status === 'generating') {
    return (
      <div
        className={cns(s.wrap, s.generateWrap, className)}
        onClick={modalNFCS.open}
      >
        <Button
          size={40}
          isSquare
          fashion="glass-branded"
          className={s.generateButton}
        >
          <TimeSVG />
        </Button>
        <Text size={12} weight={500} isUppercased color="branded">
          Generating...
        </Text>
      </div>
    )
  }

  if (stateMock.status === 'failed') {
    return (
      <div
        className={cns(s.wrap, s.generateWrap, className)}
        onClick={modalNFCS.open}
      >
        <Text size={12} weight={500} isUppercased color="branded">
          Generating failed
        </Text>
      </div>
    )
  }

  return (
    <div className={cns(s.wrap, s.generatedWrap, className)}>
      <BoltSVG className={s.generatedBolt} />
      <Text size={12} weight={500} isUppercased>
        My credit <br />
        score:
      </Text>
      <div className={s.line} />
      <Text size={24} weight={500} isUppercased>
        {stateMock.nfcs}
      </Text>
    </div>
  )
}
