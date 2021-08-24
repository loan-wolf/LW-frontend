import { useCurrentChain } from 'modules/blockChain/hooks/useCurrentChain'

import { Text } from 'shared/ui/common/Text'
import { ContentBox } from '../ContentBox'
import { HeaderWallet } from '../HeaderWallet'

import s from './Header.module.scss'
import { getChainColor, getChainName } from 'modules/blockChain/chains'

export function Header() {
  const currentChain = useCurrentChain()
  return (
    <ContentBox>
      <header className={s.header}>
        <div>Loan Wolf</div>
        <div className={s.actions}>
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
    </ContentBox>
  )
}
