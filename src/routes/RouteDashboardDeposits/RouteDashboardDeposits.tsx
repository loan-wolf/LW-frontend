import { useSWR } from 'modules/network/hooks/useSwr'
import { useWalletInfo } from 'modules/wallet/hooks/useWalletInfo'
import { useCurrentChain } from 'modules/blockChain/hooks/useCurrentChain'

import { PageLoader } from 'shared/ui/layout/PageLoader'
import { DashboardRowDeposit } from 'modules/pools/ui/DashboardRowDeposit'
// import { DashboardEmptyCTA } from 'modules/pools/ui/DashboardEmptyCTA'

import {
  ContractLiquidityFarm,
  ContractILiquidityPool,
} from 'modules/contracts/contracts'
import { createRoute } from 'modules/router/utils/createRoute'
import { withWalletConnectCheck } from 'modules/wallet/hocs/withWalletConnectCheck'
// import * as links from 'modules/router/links'

function RouteDashboardDepositsRaw() {
  const chainId = useCurrentChain()
  const { walletAddress } = useWalletInfo()

  const contractILiquidityPool = ContractILiquidityPool.useContractWeb3()
  const contractLiquidityFarm = ContractLiquidityFarm.useContractWeb3()

  const deposits = useSWR(`deposits-${chainId}-${walletAddress}`, async () => {
    const [assetAddress, deposit] = await Promise.all([
      contractILiquidityPool.token1(),
      contractLiquidityFarm.getStakeInfo(
        ContractILiquidityPool.chainAddress.get(chainId),
        walletAddress!,
      ),
    ])

    console.log(assetAddress)

    return [
      {
        assetAddress,
        deposit,
      },
    ]
  })

  if (deposits.isLoading || !deposits.data) {
    return <PageLoader />
  }

  // if (!) {
  //   return (
  //     <DashboardEmptyCTA
  //       link={links.borrow}
  //       fashion="purple"
  //       timeText="old"
  //       entityName="loans"
  //       actionText="Borrow"
  //     />
  //   )
  // }

  return (
    <>
      {deposits.data.map((item, i) => (
        <DashboardRowDeposit
          key={i}
          deposit={item.deposit}
          assetAddress={item.assetAddress}
        />
      ))}
    </>
  )
}

const RouteDashboardDeposits = withWalletConnectCheck(RouteDashboardDepositsRaw)

export const routeDashboardDeposits = createRoute({
  component: RouteDashboardDeposits,
})
