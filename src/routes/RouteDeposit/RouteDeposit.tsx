import { Input } from 'shared/ui/controls/Input'
import { Select } from 'shared/ui/controls/Select'
import { ReactComponent as TokenDAI } from 'assets/token-dai.svg'
import { ReactComponent as TokenUSDC } from 'assets/token-usdc.svg'
import { ReactComponent as TokenUSDT } from 'assets/token-usdt.svg'
import { ReactComponent as TokenETH } from 'assets/token-eth.svg'
import { ReactComponent as TokenWBTC } from 'assets/token-wbtc.svg'

import { createRoute } from 'modules/router/utils/createRoute'
import s from './RouteDeposit.module.scss'

function RouteDeposit() {
  return (
    <div className={s.wrap}>
      <Input placeholder="Text" />
      <Select
        placeholder="Select"
        options={[
          {
            label: 'No icon',
            value: 'no-icon',
          },
          {
            label: 'DAI',
            value: 'DAI',
            icon: <TokenDAI />,
          },
          {
            label: 'USDC',
            value: 'USDC',
            icon: <TokenUSDC />,
          },
          {
            label: 'USDT',
            value: 'USDT',
            icon: <TokenUSDT />,
          },
          {
            label: 'ETH',
            value: 'ETH',
            icon: <TokenETH />,
          },
          {
            label: 'WBTC',
            value: 'WBTC',
            icon: <TokenWBTC />,
          },
        ]}
      />
    </div>
  )
}

export const routeDeposit = createRoute({
  headerTitle: 'Deposit',
  component: RouteDeposit,
})
