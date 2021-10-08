import { ReactComponent as TokenDAI } from 'assets/token-dai.svg'
import { ReactComponent as TokenUSDC } from 'assets/token-usdc.svg'
import { ReactComponent as TokenUSDT } from 'assets/token-usdt.svg'
import { ReactComponent as TokenETH } from 'assets/token-eth.svg'
import { ReactComponent as TokenWBTC } from 'assets/token-wbtc.svg'

export const poolAssets = {
  DAI: 'DAI',
  USDC: 'USDC',
  USDT: 'USDT',
  ETH: 'ETH',
  WBTC: 'WBTC',
} as const

export const poolAssetIcons = {
  DAI: <TokenDAI />,
  USDC: <TokenUSDC />,
  USDT: <TokenUSDT />,
  ETH: <TokenETH />,
  WBTC: <TokenWBTC />,
} as const

export const poolAssetOptions = {
  [poolAssets.DAI]: {
    label: poolAssets.DAI,
    value: poolAssets.DAI,
    icon: poolAssetIcons.DAI,
  },
  [poolAssets.USDC]: {
    label: poolAssets.USDC,
    value: poolAssets.USDC,
    icon: poolAssetIcons.USDC,
  },
  [poolAssets.USDT]: {
    label: poolAssets.USDT,
    value: poolAssets.USDT,
    icon: poolAssetIcons.USDT,
  },
  [poolAssets.ETH]: {
    label: poolAssets.ETH,
    value: poolAssets.ETH,
    icon: poolAssetIcons.ETH,
  },
  [poolAssets.WBTC]: {
    label: poolAssets.WBTC,
    value: poolAssets.WBTC,
    icon: poolAssetIcons.WBTC,
  },
} as const
