import cns from 'classnames'
import { useMemo } from 'react'
import { useCurrentMatch } from 'modules/router/hooks/useCurreentMatch'
import { useCurrentChain } from 'modules/blockChain/hooks/useCurrentChain'

import { Text } from 'shared/ui/common/Text'
import { HeaderNFCS } from 'modules/wallet/ui/HeaderNFCS'
import { HeaderWallet } from 'modules/wallet/ui/HeaderWallet'

import s from './Header.module.scss'
import { getChainColor, getChainName } from 'modules/blockChain/chains'

type Props = {
  title: React.ReactNode
  className?: string
}

export function Header({ title, className }: Props) {
  const currentChain = useCurrentChain()
  const currentMatch = useCurrentMatch()

  const headerTitle = useMemo(
    () =>
      currentMatch.find(m => Boolean(m.route.routeMeta?.headerTitle))?.route
        .routeMeta.headerTitle,
    [currentMatch],
  )

  return (
    <header className={cns(s.header, className)}>
      <div className={s.title}>{headerTitle}</div>
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
        <HeaderWallet />
      </div>
    </header>
  )
}
