import { useMemo } from 'react'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'
import { useCollateralList } from 'modules/pools/hooks/useCollateralList'

import { PageLoader } from 'shared/ui/layout/PageLoader'
import { DashboardRowCollateral } from 'modules/pools/ui/DashboardRowCollateral'
import { DashboardEmptyCTA } from 'modules/pools/ui/DashboardEmptyCTA'

import { getERCAssetByAddress } from 'modules/pools/constants/poolAssets'
import { createRoute } from 'modules/router/utils/createRoute'
import * as links from 'modules/router/links'

function RouteDashboardCollateral() {
  const { chainId } = useWeb3()
  const collaterals = useCollateralList()

  const displayCollaterals = useMemo(() => {
    return collaterals.data?.map(item => ({
      loanId: item.loanId,
      investorAddress: item.investorAddress,
      asset: getERCAssetByAddress(item.collateral[0], chainId),
      amount: item.collateral[1],
    }))
  }, [collaterals.data, chainId])

  if (collaterals.isLoading) {
    return <PageLoader />
  }

  if (!displayCollaterals || displayCollaterals.length === 0) {
    return (
      <DashboardEmptyCTA
        link={links.borrow}
        fashion="purple"
        timeText="old"
        entityName="loans"
        actionText="Borrow"
      />
    )
  }

  return (
    <>
      {displayCollaterals.map((collateral, i) => (
        <DashboardRowCollateral key={i} collateral={collateral} />
      ))}
    </>
  )
}

export const routeDashboardCollateral = createRoute({
  component: RouteDashboardCollateral,
})
