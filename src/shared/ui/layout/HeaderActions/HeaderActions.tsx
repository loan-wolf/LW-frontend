import cns from 'classnames'
import { memo } from 'react'
import { useCurrentChain } from 'modules/blockChain/hooks/useCurrentChain'

import { Text } from 'shared/ui/common/Text'
import { HeaderNFCS } from 'modules/nfcs/ui/HeaderNFCS'
import { HeaderWallet } from 'modules/wallet/ui/HeaderWallet'

import s from './HeaderActions.module.scss'
import { getChainColor, getChainName } from 'modules/blockChain/chains'

type Props = {
  className?: string
}

function HeaderActionsRaw({ className }: Props) {
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

export const HeaderActions = memo(HeaderActionsRaw)
