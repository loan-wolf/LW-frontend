import { Text } from 'shared/ui/common/Text'
import s from './ContractSuccessTitle.module.scss'
import { useEtherscanOpener } from 'modules/blockChain/hooks/useEtherscanOpener'

type Props = {
  txHash: string | null | undefined
  children?: React.ReactNode
}

export function ContractSuccessTitle({ txHash, children }: Props) {
  const handleOpen = useEtherscanOpener(txHash, 'tx')
  return (
    <Text size={16} weight={600} isUppercased className={s.title}>
      {children}{' '}
      <Text
        className={s.link}
        onClick={handleOpen}
        color="greenapple"
        tag="span"
      >
        Show in Etherscan
      </Text>
    </Text>
  )
}
