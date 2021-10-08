import cns from 'classnames'
import { useCurrentChain } from 'modules/blockChain/hooks/useCurrentChain'

import { Text } from 'shared/ui/common/Text'
import { HeaderNFCS } from 'modules/wallet/ui/HeaderNFCS'
import { HeaderWallet } from 'modules/wallet/ui/HeaderWallet'

import s from './HeaderActions.module.scss'
import { getChainColor, getChainName } from 'modules/blockChain/chains'

type Props = {
  className?: string
}

export function HeaderActions({ className }: Props) {
  const currentChain = useCurrentChain()

  return (
    <div className={cns(s.wrap, className)}>
      <HeaderNFCS className={s.nfcs} />

      <div className={s.connect}>
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
    </div>
  )
}
