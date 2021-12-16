import { match as Match } from 'react-router'
import { useState } from 'react'

import {
  SuccessData,
  FormWithdrawalDeposit,
} from 'modules/pools/ui/FormWithdrawalDeposit'
import { SendedTransaction } from 'modules/pools/ui/SendedTransaction'
import { ContractSuccessTitle } from 'shared/ui/common/ContractSuccessTitle'
import { NarrowWrapper } from 'shared/ui/layout/NarrowWrapper'

import { withWalletConnectCheck } from 'modules/wallet/hocs/withWalletConnectCheck'
import { createRoute } from 'modules/router/utils/createRoute'

type Props = {
  match: Match<{ poolAddress: string }>
}

function RouteWithdrawalDepositRaw({ match }: Props) {
  const { poolAddress } = match.params
  const [successData, setSuccessData] = useState<SuccessData | null>(null)

  if (successData) {
    return (
      <>
        <ContractSuccessTitle txHash={successData.tx.hash}>
          Withdrawal is in progress.
        </ContractSuccessTitle>
        <SendedTransaction
          transactionType="Withdrawal collateral"
          tx={successData.tx}
        />
      </>
    )
  }

  return (
    <NarrowWrapper>
      <FormWithdrawalDeposit
        poolAddress={poolAddress}
        onSuccess={setSuccessData}
      />
    </NarrowWrapper>
  )
}

const RouteWithdrawalDeposit = withWalletConnectCheck(RouteWithdrawalDepositRaw)

export const routeWithdrawalDeposit = createRoute({
  headerTitle: 'Withdrawal',
  layoutType: 'narrow-extended',
  component: RouteWithdrawalDeposit,
})
