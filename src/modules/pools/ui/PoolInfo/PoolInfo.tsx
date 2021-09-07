import { parseEther } from 'ethers/lib/utils'

import { useCallback } from 'react'
import { useWalletInfo } from 'modules/wallet/hooks/useWalletInfo'
import { usePropmptModal } from 'modules/modal/ui/PromptModal/usePropmptModal'

import { Button } from 'shared/ui/common/Button'
import { ButtonsRow } from 'shared/ui/common/ButtonsRow'
import { PoolDataRow } from '../PoolDataRow'
import { PoolLoan } from '../PoolLoan'

import {
  ContractTestDai,
  ContractLoanWolfPoolType,
} from 'modules/contracts/contracts'
import { formatBalance } from 'modules/blockChain/utils/formatBalance'

type Props = {
  ContractLoanWolfPool: ContractLoanWolfPoolType
}

export function PoolInfo({ ContractLoanWolfPool }: Props) {
  const { walletAddress } = useWalletInfo()
  const userAddress = String(walletAddress)
  const promptModal = usePropmptModal()

  const contractLoanWolfPool = ContractLoanWolfPool.useContractWeb3()
  const contractTestDai = ContractTestDai.useContractWeb3()
  const poolAddress = contractLoanWolfPool.address

  const symbol = ContractLoanWolfPool.useSwrWeb3('symbol')
  const allowance = ContractTestDai.useSwrWeb3(
    'allowance',
    userAddress,
    poolAddress,
  )
  const liquidity = ContractLoanWolfPool.useSwrWeb3('balanceOf', poolAddress)
  const depositBalance = ContractLoanWolfPool.useSwrWeb3(
    'balanceOf',
    userAddress,
  )
  const loanId = ContractLoanWolfPool.useSwrWeb3('loanIDs', userAddress, 0)
  const userRDai = ContractLoanWolfPool.useSwrWeb3('balanceOf', userAddress)

  // Deposit
  const handleDeposit = useCallback(() => {
    promptModal.open({
      title: 'Enter deposit amount',
      onSubmit: value => {
        contractLoanWolfPool.lend(Number(value), {
          gasLimit: 500000,
        })
        promptModal.close()
      },
    })
  }, [promptModal, contractLoanWolfPool])

  // Allow
  const handleAllow = useCallback(() => {
    promptModal.open({
      title: 'Enter allowance amount',
      onSubmit: value => {
        contractTestDai.approve(poolAddress, parseEther(value), {
          gasLimit: 500000,
        })
        promptModal.close()
      },
    })
  }, [contractTestDai, promptModal, poolAddress])

  // Borrow
  const handleBorrow = useCallback(() => {
    promptModal.open({
      title: 'Enter allowance amount',
      onSubmit: value => {
        contractLoanWolfPool.configureNew(userAddress, 10, 12, Number(value), {
          gasLimit: 500000,
        })
        promptModal.close()
      },
    })
  }, [userAddress, promptModal, contractLoanWolfPool])

  // Withdraw
  const handleWithdraw = useCallback(() => {
    promptModal.open({
      title: 'Enter withdraw amount',
      onSubmit: value => {
        contractLoanWolfPool.withdrawl(Number(value), {
          gasLimit: 500000,
        })
        promptModal.close()
      },
    })
  }, [contractLoanWolfPool, promptModal])

  return (
    <div>
      <PoolDataRow title="Symbol" data={symbol} />

      <PoolDataRow title="Allowance" data={allowance} render={formatBalance} />

      <PoolDataRow title="Liquidity" data={liquidity} render={formatBalance} />

      <PoolDataRow
        title="Deposit balance"
        data={depositBalance}
        render={formatBalance}
      />

      <PoolDataRow
        title="User rDai balance"
        data={userRDai}
        render={formatBalance}
      />

      <PoolDataRow
        title="Loan id"
        data={loanId}
        render={id =>
          id !== undefined &&
          allowance.data && (
            <PoolLoan
              ContractLoanWolfPool={ContractLoanWolfPool}
              loanId={id}
              allowance={allowance.data}
              onClickAllow={handleAllow}
            />
          )
        }
      />

      <ButtonsRow>
        {!allowance.isLoading && allowance.data && (
          <>
            {allowance.data.isZero() ? (
              <Button onClick={handleAllow}>Allow</Button>
            ) : (
              <Button onClick={handleDeposit}>Deposit</Button>
            )}
          </>
        )}

        <Button onClick={handleBorrow}>Borrow</Button>

        <Button onClick={handleWithdraw}>Withdraw</Button>
      </ButtonsRow>
    </div>
  )
}
