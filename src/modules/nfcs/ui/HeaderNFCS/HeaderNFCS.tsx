import cns from 'classnames'
import { useNFCSState } from 'modules/nfcs/hooks/useNFCSState'
import { useNFCSModal } from 'modules/nfcs/ui/NFCSModal/useNFCSModal'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'

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
  const { isWalletConnected } = useWeb3()
  const creditScoreState = useNFCSState()

  if (!isWalletConnected) {
    return null
  }

  if (creditScoreState.status === 'loading') {
    return (
      <div className={cns(s.wrap, s.generateWrap, className)}>
        <Button
          size={40}
          isSquare
          fashion="glass-branded"
          className={s.generateButton}
        >
          <TimeSVG />
        </Button>
        <Text size={12} weight={500} isUppercased color="branded">
          Loading...
        </Text>
      </div>
    )
  }

  if (creditScoreState.status === 'not-generated') {
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

  if (creditScoreState.status === 'generating') {
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

  return (
    <div
      className={cns(s.wrap, s.generatedWrap, className)}
      onClick={modalNFCS.open}
    >
      <BoltSVG className={s.generatedBolt} />
      <Text size={12} weight={500} isUppercased>
        My credit <br />
        score:
      </Text>
      <div className={s.line} />
      <Text size={24} weight={500} isUppercased>
        {creditScoreState.nfcs}
      </Text>
    </div>
  )
}
