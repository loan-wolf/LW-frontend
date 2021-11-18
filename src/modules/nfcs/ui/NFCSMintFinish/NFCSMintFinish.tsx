import { ContractScoreDB } from 'modules/contracts/contracts'
import { useNFCSState } from 'modules/nfcs/hooks/useNFCSState'
import { useCallback } from 'react'

import { Text } from 'shared/ui/common/Text'
import { Button } from 'shared/ui/controls/Button'

import s from './NFCSMintFinish.module.scss'

type Props = {
  onClose?: () => void
}

export function NFCSMintFinish({ onClose }: Props) {
  const { nfcs, tokenId } = useNFCSState()
  const contractScoreDB = ContractScoreDB.useContractWeb3()
  const handleGetScoreManually = useCallback(() => {
    if (!tokenId) return
    contractScoreDB.requestUpdatedScoreFrontend(tokenId)
  }, [contractScoreDB, tokenId])
  return (
    <>
      <Text
        size={16}
        weight={600}
        isUppercased
        isCentered
        className={s.undertitle}
      >
        Your Credit Score is generated
      </Text>
      <Text size={44} weight={700} isUppercased isCentered className={s.title}>
        Your Credit Score:
      </Text>
      <Button
        size={24}
        isCentered
        fashion="glass"
        onClick={handleGetScoreManually}
      >
        Get score manually
      </Button>
      <br />
      <div className={s.scoreWrap}>
        <div>{nfcs}</div>
        <Button className={s.finish} onClick={onClose}>
          Finish
        </Button>
      </div>
    </>
  )
}
