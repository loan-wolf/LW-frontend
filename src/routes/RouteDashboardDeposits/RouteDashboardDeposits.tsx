import { useDepositsList } from 'modules/pools/hooks/useDepositsList'

import { PageLoader } from 'shared/ui/layout/PageLoader'
import { DashboardRowDeposit } from 'modules/pools/ui/DashboardRowDeposit'

import { createRoute } from 'modules/router/utils/createRoute'
import { withWalletConnectCheck } from 'modules/wallet/hocs/withWalletConnectCheck'

function RouteDashboardDepositsRaw() {
  const deposits = useDepositsList()

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
          apy={item.apy}
          deposit={item.deposit}
          poolAddress={item.poolAddress}
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
