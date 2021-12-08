import cns from 'classnames'
import { memo } from 'react'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'

import { Text } from 'shared/ui/common/Text'
import { HeaderNFCS } from 'modules/nfcs/ui/HeaderNFCS'
import { HeaderWallet } from 'modules/wallet/ui/HeaderWallet'

import s from './HeaderActions.module.scss'
import { getChainColor, getChainName } from 'modules/blockChain/chains'

type Props = {
  className?: string
}

function HeaderActionsRaw({ className }: Props) {
  const { chainId } = useWeb3()

  return (
    <div className={cns(s.wrap, className)}>
      <HeaderNFCS className={s.nfcs} />

      <div className={s.connect}>
        <div className={s.network}>
          <div
            className={s.networkBulb}
            style={{ backgroundColor: getChainColor(chainId) }}
          />
          <Text size={14} weight={500}>
            {getChainName(chainId)}
          </Text>
        </div>
        <HeaderWallet className={s.wallet} />
      </div>
    </div>
  )
}

export const HeaderActions = memo(HeaderActionsRaw)
