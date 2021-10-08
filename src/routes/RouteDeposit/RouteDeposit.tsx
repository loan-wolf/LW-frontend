import { Input } from 'shared/ui/controls/Input'
import { Select } from 'shared/ui/controls/Select'
import { poolAssetOptions } from 'modules/pools/data/poolAssets'

import { createRoute } from 'modules/router/utils/createRoute'
// import s from './RouteDeposit.module.scss'

function RouteDeposit() {
  return (
    <>
      <Select placeholder="Select" options={poolAssetOptions} />
      <Input placeholder="Text" />
    </>
  )
}

export const routeDeposit = createRoute({
  headerTitle: 'Deposit',
  layoutType: 'narrow',
  component: RouteDeposit,
})
