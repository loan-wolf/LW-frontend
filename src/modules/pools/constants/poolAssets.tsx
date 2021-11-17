import { get } from 'lodash'
import { Chains } from 'modules/blockChain/chains'
import { ReactComponent as TokenDAI } from 'assets/token-dai.svg'
import { ReactComponent as TokenUSDC } from 'assets/token-usdc.svg'
import { ReactComponent as TokenUSDT } from 'assets/token-usdt.svg'
import { ReactComponent as TokenETH } from 'assets/token-eth.svg'
import { ReactComponent as TokenWBTC } from 'assets/token-wbtc.svg'
import * as addresses from 'modules/contracts/contractAddresses'
import * as contracts from 'modules/contracts/contracts'

export const poolAssets = {
  DAI: 'DAI',
  USDC: 'USDC',
  USDT: 'USDT',
  ETH: 'ETH',
  WBTC: 'WBTC',
} as const
export type PoolAsset = keyof typeof poolAssets

export const poolAssetIcons = {
  DAI: <TokenDAI />,
  USDC: <TokenUSDC />,
  USDT: <TokenUSDT />,
  ETH: <TokenETH />,
  WBTC: <TokenWBTC />,
} as const

export function getPoolAssetIcon(asset: string) {
  return get(poolAssetIcons, asset, null) as React.ReactNode | null
}

export const poolAssetAddresses = {
  [poolAssets.DAI]: addresses.TestDAI,
  [poolAssets.USDC]: {
    [Chains.Kovan]: '',
  },
  [poolAssets.USDT]: {
    [Chains.Kovan]: '',
  },
  [poolAssets.ETH]: addresses.TestETH,
  [poolAssets.WBTC]: {
    [Chains.Kovan]: '',
  },
} as const

export function getPoolAssetAddress(asset: PoolAsset, chain: Chains) {
  return get(poolAssetAddresses, [asset, chain], null) as string | null
}

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

export const poolAssetContracts = {
  [poolAssets.DAI]: contracts.ContractTestDAI,
  [poolAssets.USDC]: null,
  [poolAssets.USDT]: null,
  [poolAssets.ETH]: contracts.ContractTestETH,
  [poolAssets.WBTC]: null,
} as const

export function getPoolAssetContract(asset: PoolAsset) {
  return poolAssetContracts[asset]
}
