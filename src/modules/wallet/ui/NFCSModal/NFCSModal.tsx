import { useState } from 'react'

import { NFCSMintForm } from '../NFCSMintForm'
import { NFCSMintProgress } from '../NFCSMintProgress'
import { NFCSMintFinish } from '../NFCSMintFinish'

import { Modal, ModalProps } from 'modules/modal/ui/Modal'

type Props = {} & ModalProps

export function NFCSModal(props: Props) {
  const { onClose } = props
  const [tempState, setTempState] = useState(0)

  return (
    <Modal width={580} {...props}>
      {tempState === 0 && <NFCSMintForm onSuccess={() => setTempState(1)} />}
      {tempState === 1 && <NFCSMintProgress onClose={() => setTempState(2)} />}
      {tempState === 2 && <NFCSMintFinish onClose={() => onClose()} />}
    </Modal>
  )
}
