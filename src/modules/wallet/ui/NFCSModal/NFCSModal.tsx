// import { useCallback } from 'react'
import { useNFCSStateMock } from 'modules/wallet/hooks/useNFCSStateMock'

import { NFCSMintForm } from '../NFCSMintForm'
import { NFCSMintProgress } from '../NFCSMintProgress'
import { NFCSMintFinish } from '../NFCSMintFinish'
import { Modal, ModalProps } from 'modules/modal/ui/Modal'

// import { ContractRociCreditToken } from 'modules/contracts/contracts'

type Props = {} & ModalProps

export function NFCSModal(props: Props) {
  const { onClose } = props
  const [stateMock, setStateMock] = useNFCSStateMock()
  // const contractRockiCreditToken = ContractRociCreditToken.useContractWeb3()

  // const  = ContractRociCreditToken.useSwrWeb3('mintToken')

  // const handleMint = useCallback(() => {
  //   contractRockiCreditToken.mintToken()
  // }, [contractRockiCreditToken])

  return (
    <Modal width={580} {...props}>
      {stateMock.status === 'not-generated' && (
        <NFCSMintForm
          onSuccess={() => setStateMock({ status: 'generating' })}
        />
      )}
      {stateMock.status === 'generating' && (
        <NFCSMintProgress
          onClose={() => setStateMock({ status: 'generated', nfcs: 9 })}
        />
      )}
      {stateMock.status === 'generated' && (
        <NFCSMintFinish onClose={() => onClose()} />
      )}
    </Modal>
  )
}
