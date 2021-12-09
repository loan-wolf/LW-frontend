import { memoize } from 'lodash'
import { get, getOr, toPairs, find, flow } from 'lodash/fp'
import { Chains } from 'modules/blockChain/chains'
import { ReactComponent as TokenDAI } from 'assets/token-dai.svg'
import { ReactComponent as TokenUSDC } from 'assets/token-usdc.svg'
import { ReactComponent as TokenUSDT } from 'assets/token-usdt.svg'
import { ReactComponent as TokenETH } from 'assets/token-eth.svg'
import { ReactComponent as TokenWBTC } from 'assets/token-wbtc.svg'
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
  return getOr(null, asset, poolAssetIcons) as React.ReactNode | null
}

export const assetERCContracts = {
  [poolAssets.DAI]: contracts.ContractTestDAI,
  [poolAssets.USDC]: contracts.ContractTestUSDC,
  [poolAssets.USDT]: contracts.ContractTestUSDT,
  [poolAssets.ETH]: contracts.ContractTestETH,
  [poolAssets.WBTC]: contracts.ContractTestWBTC,
} as const

export function getERCContractByAsset(asset: PoolAsset) {
  const contract = assetERCContracts[asset]
  // if (!contract) throw new Error(`Contract for asset ${asset} not defined`)
  return contract
}

export function getPoolAssetAddress(asset: PoolAsset, chain: Chains) {
  const addr = assetERCContracts[asset].chainAddress
  return addr.get(chain)
}

export const getPoolAssetByAddress = memoize(
  (address: string, chain: Chains) => {
    return flow(
      toPairs,
      find(([a, c]) => address === c.chainAddress?.get(chain)),
      get(0),
    )(assetERCContracts) as PoolAsset | undefined
  },
)

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
