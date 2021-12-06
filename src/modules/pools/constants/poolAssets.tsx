import { get, getOr, toPairs, find, flow } from 'lodash/fp'
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
  DAI2: 'DAI2',
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
  return getOr(null, asset, poolAssetIcons) as React.ReactNode | null
}

export const poolAssetAddresses = {
  [poolAssets.DAI]: addresses.addressTestDAI,
  [poolAssets.DAI2]: addresses.addressTestDAI2,
  [poolAssets.USDC]: null,
  [poolAssets.USDT]: null,
  [poolAssets.ETH]: addresses.addressTestETH,
  [poolAssets.WBTC]: null,
} as const

export function getPoolAssetAddress(asset: PoolAsset, chain: Chains) {
  const addr = poolAssetAddresses[asset]
  return addr?.get(chain)
}

export function getPoolAssetByAddress(address: string, chain: Chains) {
  return flow(
    toPairs,
    find(([asset, poolAddress]) => address === poolAddress?.get(chain)),
    get(0),
  )(poolAssetAddresses) as PoolAsset | undefined
}

export const poolAssetOptions = {
  [poolAssets.DAI]: {
    label: poolAssets.DAI,
    value: poolAssets.DAI,
    icon: poolAssetIcons.DAI,
  },
  [poolAssets.DAI2]: {
    label: poolAssets.DAI2,
    value: poolAssets.DAI2,
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
  [poolAssets.DAI2]: contracts.ContractTestDAI2,
  [poolAssets.USDC]: null,
  [poolAssets.USDT]: null,
  [poolAssets.ETH]: contracts.ContractTestETH,
  [poolAssets.WBTC]: null,
} as const

export function getPoolAssetContract(asset: PoolAsset) {
  const contract = poolAssetContracts[asset]
  if (!contract) throw new Error(`Contract for asset ${asset} not defined`)
  return contract
}
