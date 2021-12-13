import { match as Match } from 'react-router'
import { useState } from 'react'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'
// import { useSWR } from 'modules/network/hooks/useSwr'

import {
  SuccessData,
  FormWithdrawalDeposit,
} from 'modules/pools/ui/FormWithdrawalDeposit'
import { SendedTransaction } from 'modules/pools/ui/SendedTransaction'
import { ContractSuccessTitle } from 'shared/ui/common/ContractSuccessTitle'
import { NarrowWrapper } from 'shared/ui/layout/NarrowWrapper'
// import { PageLoader } from 'shared/ui/layout/PageLoader'

import { getAssetByPoolAddress } from 'modules/pools/utils/getILiquidityPoolContract'
import { getPoolAssetAddress } from 'modules/pools/constants/poolAssets'
import { withWalletConnectCheck } from 'modules/wallet/hocs/withWalletConnectCheck'
import { createRoute } from 'modules/router/utils/createRoute'

type Props = {
  match: Match<{ poolAddress: string }>
}

function RouteWithdrawalDepositRaw({ match }: Props) {
  const { chainId } = useWeb3()

  const poolAddress = match.params.poolAddress
  const asset = getAssetByPoolAddress(chainId, poolAddress)
  const depositedTokenAddress = getPoolAssetAddress(asset, chainId)

  // const depositedInfoReq = useSWR(
  //   `deposit-withdrawal-info-${chainId}-${poolAddress}`,
  //   async () => {
  //     const PoolContract = getILiquidityPoolContractByAddress(
  //       chainId,
  //       poolAddress,
  //     )
  //     const poolContract = PoolContract.connectWeb3({ chainId, library })
  //     const [totalSupply] = await Promise.all([poolContract.totalSupply()])
  //     console.log(totalSupply)
  //     return {
  //       depositedTokenAddress,
  //     }
  //   },
  // )

  const [successData, setSuccessData] = useState<SuccessData | null>(null)

  // const { data: depositedInfo } = depositedInfoReq

  // if (!depositedInfo) {
  //   return <PageLoader />
  // }

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
        depositedAddress={depositedTokenAddress}
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
