import { identity } from 'lodash'
import { parseEther } from 'ethers/lib/utils'

import { useCallback } from 'react'
import { useWalletInfo } from 'modules/wallet/hooks/useWalletInfo'

import { Button } from 'shared/ui/common/Button'

import {
  ContractTestDai,
  getContractLoanWolfPool,
} from 'modules/contracts/contracts'
import { formatBalance } from 'modules/blockChain/utils/formatBalance'
import type { SWRResponse } from 'modules/network/hooks/useSwr'

import s from './PoolInfo.module.scss'

type RowProps<D> = {
  title?: React.ReactNode
  data: SWRResponse<D>
  render?: (d?: D) => React.ReactNode
}

function Row<D>({ title, data, render = identity }: RowProps<D>) {
  return (
    <div className={s.row}>
      <div className={s.rowTitle}>{title}</div>
      <div className={s.rowText}>
        {data.isLoading
          ? 'Loading...'
          : data.error
          ? 'Error'
          : render(data.data)}
      </div>
    </div>
  )
}

type Props = {
  ContractLoanWolfPool: ReturnType<typeof getContractLoanWolfPool>
}

export function PoolInfo({ ContractLoanWolfPool }: Props) {
  const { walletAddress } = useWalletInfo()
  const contractLoanWolfPool = ContractLoanWolfPool.useContractWeb3()
  const contractTestDai = ContractTestDai.useContractWeb3()
  const poolAddress = contractLoanWolfPool.address

  const symbol = ContractLoanWolfPool.useSwrWeb3('symbol')

  const allowance = ContractTestDai.useSwrWeb3(
    'allowance',
    String(walletAddress),
    poolAddress,
  )

  const liquidity = ContractLoanWolfPool.useSwrWeb3('balanceOf', poolAddress)

  const depositBalance = ContractLoanWolfPool.useSwrWeb3(
    'balanceOf',
    String(walletAddress),
  )

  const loanId = ContractLoanWolfPool.useSwrWeb3(
    'loanIDs',
    String(walletAddress),
    1,
  )

  const deposit = useCallback(() => {
    contractLoanWolfPool.lend(100, {
      gasLimit: 500000,
    })
  }, [contractLoanWolfPool])

  const allow = useCallback(() => {
    contractTestDai.approve(poolAddress, parseEther('1000'), {
      gasLimit: 500000,
    })
  }, [contractTestDai, poolAddress])

  const borrow = useCallback(() => {
    if (!walletAddress) return
    contractLoanWolfPool.configureNew(walletAddress, 10, 12, 100, {
      gasLimit: 500000,
    })
  }, [contractLoanWolfPool, walletAddress])

  const borrowSubmit = useCallback(() => {
    if (!loanId.data) return
    contractLoanWolfPool.borrow(loanId.data, {
      gasLimit: 500000,
    })
  }, [contractLoanWolfPool, loanId.data])

  return (
    <div>
      <Row title="Symbol" data={symbol} />

      <Row title="Allowance" data={allowance} render={formatBalance} />

      <Row title="Liquidity" data={liquidity} render={formatBalance} />

      <Row
        title="Deposit balance"
        data={depositBalance}
        render={formatBalance}
      />

      <Row
        title="Loan id"
        data={loanId}
        render={id => (
          <>
            <span>{id}</span>
            <Button onClick={borrowSubmit}>Finalize</Button>
          </>
        )}
      />

      <div className={s.actions}>
        {!allowance.isLoading && allowance.data && (
          <>
            {allowance.data.isZero() ? (
              <Button onClick={allow}>Allow</Button>
            ) : (
              <Button onClick={deposit}>Deposit</Button>
            )}
          </>
        )}

        <Button onClick={borrow}>Borrow</Button>
      </div>
    </div>
  )
}
