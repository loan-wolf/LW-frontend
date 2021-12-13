import { memoize } from 'lodash'
import { get, getOr, toPairs, find, flow } from 'lodash/fp'
import { Chains } from 'modules/blockChain/chains'
import { ReactComponent as TokenDAI } from 'assets/token-dai.svg'
import { ReactComponent as TokenUSDC } from 'assets/token-usdc.svg'
import { ReactComponent as TokenUSDT } from 'assets/token-usdt.svg'
import { ReactComponent as TokenETH } from 'assets/token-eth.svg'
import { ReactComponent as TokenWBTC } from 'assets/token-wbtc.svg'
import * as contracts from 'modules/contracts/contracts'

export const PoolAsset = {
  DAI: 'DAI',
  USDC: 'USDC',
  USDT: 'USDT',
  ETH: 'ETH',
  WBTC: 'WBTC',
} as const
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type PoolAsset = keyof typeof PoolAsset

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
  [PoolAsset.DAI]: contracts.ContractTestDAI,
  [PoolAsset.USDC]: contracts.ContractTestUSDC,
  [PoolAsset.USDT]: contracts.ContractTestUSDT,
  [PoolAsset.ETH]: contracts.ContractTestETH,
  [PoolAsset.WBTC]: contracts.ContractTestWBTC,
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
  (...args) => args.join('-'),
)

export const poolAssetOptions = {
  [PoolAsset.DAI]: {
    label: PoolAsset.DAI,
    value: PoolAsset.DAI,
    icon: poolAssetIcons.DAI,
  },
  [PoolAsset.USDC]: {
    label: PoolAsset.USDC,
    value: PoolAsset.USDC,
    icon: poolAssetIcons.USDC,
  },
  [PoolAsset.USDT]: {
    label: PoolAsset.USDT,
    value: PoolAsset.USDT,
    icon: poolAssetIcons.USDT,
  },
  [PoolAsset.ETH]: {
    label: PoolAsset.ETH,
    value: PoolAsset.ETH,
    icon: poolAssetIcons.ETH,
  },
  [PoolAsset.WBTC]: {
    label: PoolAsset.WBTC,
    value: PoolAsset.WBTC,
    icon: poolAssetIcons.WBTC,
  },
} as const
