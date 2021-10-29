import { useEffect } from 'react'
// import { useNfcsTokenId } from 'modules/pools/hooks/useNfcsTokenId'
import { useNFCSStateMock } from 'modules/nfcs/hooks/useNFCSStateMock'
import { useTransactionStatus } from 'modules/blockChain/hooks/useTransactionStatus'

import { NFCSMintForm } from '../NFCSMintForm'
import { NFCSMintProgress } from '../HeaderNFCS/NFCSMintProgress'
import { NFCSMintFinish } from '../NFCSMintFinish'
import { NFCSMintFailed } from '../NFCSMintFailed'
import { Modal, ModalProps } from 'modules/modal/ui/Modal'

type Props = {} & ModalProps

export function NFCSModal(props: Props) {
  const { onClose } = props
  const [stateMock, setStateMock] = useNFCSStateMock()
  // const tokenId = useNfcsTokenId()

  // console.log('TokenID:', tokenId.data)

  const { status: txStatus } = useTransactionStatus({
    hash: stateMock.txHash,
    defaultStatus: 'empty',
  })

  useEffect(() => {
    if (txStatus === 'success' && stateMock.status !== 'generated') {
      setStateMock({ status: 'generated', nfcs: 9 })
    } else if (
      txStatus === 'failed' &&
      stateMock.txHash &&
      stateMock.status !== 'failed'
    ) {
      setStateMock({ status: 'failed' })
    }
  }, [setStateMock, stateMock, txStatus])

  return (
    <Modal width={580} {...props}>
      {stateMock.status === 'not-generated' && (
        <NFCSMintForm
          onTxSubmit={txHash => setStateMock({ status: 'generating', txHash })}
        />
      )}

      {stateMock.status === 'generating' && stateMock.txHash && (
        <NFCSMintProgress txHash={stateMock.txHash} />
      )}

      {stateMock.status === 'generated' && <NFCSMintFinish onClose={onClose} />}

      {stateMock.status === 'failed' && (
        <NFCSMintFailed
          txHash={stateMock.txHash}
          onRetry={() =>
            setStateMock({ status: 'not-generated', txHash: null })
          }
        />
      )}
    </Modal>
  )
}
