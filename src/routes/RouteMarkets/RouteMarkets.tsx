import { MarketsTable } from 'modules/pools/ui/MarketsTable'

import { createRoute } from 'modules/router/utils/createRoute'
import s from './RouteMarkets.module.scss'

function RouteMarkets() {
  return (
    <>
      <div className={s.title}>
        <span className={s.titleFade}>List of assets available for </span>
        borrowing and lending
      </div>

      <MarketsTable />

      <br />

      {/* {PoolContract0 ? (
        <PoolInfo ContractLoanWolfPool={PoolContract0} />
      ) : (
        'Pool is loading...'
      )} */}
    </>
  )
}

export const routeMarkets = createRoute({
  headerTitle: 'Markets',
  component: RouteMarkets,
})
