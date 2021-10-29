import { useEtherscanOpener } from 'modules/blockChain/hooks/useEtherscanOpener'

import { Text } from 'shared/ui/common/Text'
import { Button } from 'shared/ui/controls/Button'
import { ButtonsRow } from 'shared/ui/common/ButtonsRow'

import s from './NFCSMintFailed.module.scss'

type Props = {
  txHash?: string | null
  onRetry?: () => void
}

export function NFCSMintFailed({ txHash, onRetry }: Props) {
  const open = useEtherscanOpener(txHash, 'tx')

  return (
    <>
      <Text size={44} weight={700} isUppercased isCentered className={s.title}>
        NFCS Minting Failed
      </Text>
      <ButtonsRow isCentered>
        <Button size={60} fashion="glass" onClick={open}>
          Check on etherscan
        </Button>
        <Button size={60} fashion="glass" onClick={onRetry}>
          Retry
        </Button>
      </ButtonsRow>
    </>
  )
}
