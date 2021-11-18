import { useNFCSState, setNFCSTxHash } from 'modules/nfcs/hooks/useNFCSState'

import { NFCSMintForm } from '../NFCSMintForm'
import { NFCSMintProgress } from '../NFCSMintProgress'
import { NFCSMintFinish } from '../NFCSMintFinish'
import { NFCSMintFailed } from '../NFCSMintFailed'
import { Modal, ModalProps } from 'modules/modal/ui/Modal'

type Props = {} & ModalProps

export function NFCSModal(props: Props) {
  const { onClose } = props
  const creditScoreState = useNFCSState()

  return (
    <Modal width={580} {...props}>
      {creditScoreState.status === 'not-generated' && (
        <NFCSMintForm onTxSubmit={txHash => setNFCSTxHash(txHash)} />
      )}

      {creditScoreState.status === 'generating' && creditScoreState.txHash && (
        <NFCSMintProgress txHash={creditScoreState.txHash} />
      )}

      {creditScoreState.status === 'generated' && (
        <NFCSMintFinish onClose={onClose} />
      )}

      {creditScoreState.status === 'failed' && (
        <NFCSMintFailed
          txHash={creditScoreState.txHash}
          onRetry={() => setNFCSTxHash(null)}
        />
      )}
    </Modal>
  )
}
