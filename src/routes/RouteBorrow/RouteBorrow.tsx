import { useState } from 'react'

import { NarrowWrapper } from 'shared/ui/layout/NarrowWrapper'
import { FormBorrow, SuccessData } from 'modules/pools/ui/FormBorrow'
import { ContractSuccessTitle } from 'shared/ui/common/ContractSuccessTitle'
import { SendedTransaction } from 'modules/pools/ui/SendedTransaction'

import { withWalletConnectCheck } from 'modules/wallet/hocs/withWalletConnectCheck'
import { createRoute } from 'modules/router/utils/createRoute'

function RouteBorrowRaw() {
  const [successData, setSuccessData] = useState<SuccessData | null>(null)

  if (!successData) {
    return (
      <NarrowWrapper>
        <FormBorrow onSuccess={setSuccessData} />
      </NarrowWrapper>
    )
  }

  return (
    <>
      <ContractSuccessTitle>Deposit Successful.</ContractSuccessTitle>
      <SendedTransaction tx={successData.tx} transactionType="Borrow" />
    </>
  )
}

const RouteBorrow = withWalletConnectCheck(RouteBorrowRaw)

export const routeBorrow = createRoute({
  headerTitle: 'Borrow',
  layoutType: 'narrow-extended',
  component: RouteBorrow,
})
