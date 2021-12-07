import { match as Match } from 'react-router'
import { useState } from 'react'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'
import { useSWR } from 'modules/network/hooks/useSwr'
import { useCurrentChain } from 'modules/blockChain/hooks/useCurrentChain'

import {
  SuccessData,
  FormWithdrawalDeposit,
} from 'modules/pools/ui/FormWithdrawalDeposit'
import { SendedTransaction } from 'modules/pools/ui/SendedTransaction'
import { ContractSuccessTitle } from 'shared/ui/common/ContractSuccessTitle'
import { NarrowWrapper } from 'shared/ui/layout/NarrowWrapper'
import { PageLoader } from 'shared/ui/layout/PageLoader'

import { getPoolContractByAddress } from 'modules/pools/utils/getPoolContract'
import { withWalletConnectCheck } from 'modules/wallet/hocs/withWalletConnectCheck'
import { createRoute } from 'modules/router/utils/createRoute'

type Props = {
  match: Match<{ poolAddress: string }>
}

function RouteWithdrawalDepositRaw({ match }: Props) {
  const chainId = useCurrentChain()
  const { library } = useWeb3()

  const poolAddress = match.params.poolAddress

  const depositedInfoReq = useSWR(
    `deposit-withdrawal-info-${chainId}-${poolAddress}`,
    async () => {
      const PoolContract = getPoolContractByAddress(poolAddress, chainId)
      const poolContract = PoolContract.connectWeb3({
        chainId,
        library: library?.getSigner(),
      })
      const [depositedTokenAddress] = await Promise.all([poolContract.token1()])
      return {
        depositedTokenAddress,
      }
    },
  )
  const [successData, setSuccessData] = useState<SuccessData | null>(null)

  const { data: depositedInfo } = depositedInfoReq

  if (!depositedInfo) {
    return <PageLoader />
  }

  if (successData) {
    return (
      <>
        <ContractSuccessTitle>Withdrawal is in progress.</ContractSuccessTitle>
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
        depositedAddress={depositedInfo.depositedTokenAddress}
        // collateralAddress={collateral[0]}
        // collateralAmount={collateral[1]}
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
