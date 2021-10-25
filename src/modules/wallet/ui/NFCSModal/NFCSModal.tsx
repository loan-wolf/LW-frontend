import { useSWR } from 'modules/network/hooks/useSwr'
import { useWalletInfo } from 'modules/wallet/hooks/useWalletInfo'
import { useNFCSStateMock } from 'modules/wallet/hooks/useNFCSStateMock'

import { NFCSMintForm } from '../NFCSMintForm'
import { NFCSMintProgress } from '../NFCSMintProgress'
import { NFCSMintFinish } from '../NFCSMintFinish'
import { Modal, ModalProps } from 'modules/modal/ui/Modal'

import { ContractRociCreditToken } from 'modules/contracts/contracts'

type Props = {} & ModalProps

export function NFCSModal(props: Props) {
  const { onClose } = props
  const [stateMock, setStateMock] = useNFCSStateMock()

  const { walletAddress } = useWalletInfo()
  const contract = ContractRociCreditToken.useContractWeb3()

  // const a = ContractRociCreditToken.useSwrWeb3('')

  const b = useSWR('mint-event', async () => {
    const filter = contract.filters.TokenMinted(walletAddress)
    // const filter = contract.filters.
    const event = (await contract.queryFilter(filter))[0]
    console.log(event)
    if (!event.decode) {
      throw new Error('Event parsing error')
    }
    const decoded = event.decode(event.data, event.topics)
    return decoded as any
  })

  console.log(b)

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
