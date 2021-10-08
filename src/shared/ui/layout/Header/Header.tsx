import cns from 'classnames'
import { useCurrentChain } from 'modules/blockChain/hooks/useCurrentChain'

import { Text } from 'shared/ui/common/Text'
import { HeaderNFCS } from 'modules/wallet/ui/HeaderNFCS'
import { HeaderWallet } from 'modules/wallet/ui/HeaderWallet'

import s from './Header.module.scss'
import { getChainColor, getChainName } from 'modules/blockChain/chains'

type Props = {
  title: React.ReactNode
  isNarrow: boolean
  className?: string
}

export function Header({ title, isNarrow, className }: Props) {
  const currentChain = useCurrentChain()

  return (
    <header className={cns(s.header, className, { [s.isNarrow]: isNarrow })}>
      <div className={s.title}>{title}</div>

      <div className={s.actions}>
        <HeaderNFCS className={s.nfcs} />

        <div className={s.network}>
          <div
            className={s.networkBulb}
            style={{ backgroundColor: getChainColor(currentChain) }}
          />
          <Text size={14} weight={500}>
            {getChainName(currentChain)}
          </Text>
        </div>

        <HeaderWallet className={s.wallet} />
      </div>
    </header>
  )
}
