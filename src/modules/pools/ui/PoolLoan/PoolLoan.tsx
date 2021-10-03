import { useCallback } from 'react'
import { usePropmptModal } from 'modules/modal/ui/PromptModal/usePropmptModal'

import { Button } from 'shared/ui/controls/Button'
import { ButtonsRow } from 'shared/ui/common/ButtonsRow'

import type { BigNumber } from 'ethers'
import type { ContractLoanWolfPoolType } from 'modules/contracts/contracts'

type Props = {
  ContractLoanWolfPool: ContractLoanWolfPoolType
  loanId: BigNumber
  allowance: BigNumber
  onClickAllow: () => void
}

export function PoolLoan({
  ContractLoanWolfPool,
  allowance,
  loanId,
  onClickAllow,
}: Props) {
  const contractLoanWolfPool = ContractLoanWolfPool.useContractWeb3()

  const isComplete = ContractLoanWolfPool.useSwrWeb3('isComplete', loanId)

  // Borrow
  const borrowSubmit = useCallback(() => {
    contractLoanWolfPool.borrow(loanId, {
      gasLimit: 500000,
    })
  }, [contractLoanWolfPool, loanId])

  const promptModal = usePropmptModal()

  // Repay
  const handleRepay = useCallback(() => {
    promptModal.open({
      title: 'Enter repay amount',
      onSubmit: value => {
        contractLoanWolfPool.payment(loanId, Number(value), {
          gasLimit: 500000,
        })
        promptModal.close()
      },
    })
  }, [promptModal, contractLoanWolfPool, loanId])

  return (
    <>
      <div>{loanId}</div>
      {isComplete.data === true && <div>Complete</div>}
      {isComplete.data === false && (
        <>
          <div>Not complete</div>
          <ButtonsRow>
            {allowance.isZero() ? (
              <Button onClick={onClickAllow}>Allow</Button>
            ) : (
              <Button onClick={handleRepay}>Repay</Button>
            )}
            <Button onClick={borrowSubmit}>Finalize</Button>
          </ButtonsRow>
        </>
      )}
    </>
  )
}
