import { useNfcsTokenId } from 'modules/pools/hooks/useNfcsTokenId'
import { useNFCSStateMock } from 'modules/wallet/hooks/useNFCSStateMock'

import { NFCSMintForm } from '../NFCSMintForm'
import { NFCSMintProgress } from '../NFCSMintProgress'
import { NFCSMintFinish } from '../NFCSMintFinish'
import { Modal, ModalProps } from 'modules/modal/ui/Modal'

type Props = {} & ModalProps

export function NFCSModal(props: Props) {
  const { onClose } = props
  const [stateMock, setStateMock] = useNFCSStateMock()
  const tokenId = useNfcsTokenId()

  console.log('TokenID:', tokenId.data)

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
