import cns from 'classnames'

import { useNFCSModal } from 'modules/wallet/ui/NFCSModal/useNFCSModal'
import { useWalletInfo } from 'modules/wallet/hooks/useWalletInfo'
import { usePermittedAddresses } from 'modules/wallet/hooks/usePermittedAddresses'

import { Text } from 'shared/ui/common/Text'
import { Button } from 'shared/ui/controls/Button'
import { ReactComponent as BoltSVG } from 'assets/bolt.svg'

import s from './HeaderNFCS.module.scss'

type Props = {
  className?: string
}

export function HeaderNFCS({ className }: Props) {
  const modalNFCS = useNFCSModal()
  const { isWalletConnected } = useWalletInfo()

  if (!isWalletConnected) {
    return null
  }

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
