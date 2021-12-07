import * as ethers from 'ethers'
import { useCurrentChain } from 'modules/blockChain/hooks/useCurrentChain'

import { InfoFieldValue } from 'shared/ui/common/InfoFieldValue'
import { DropdownDeposit } from '../DropdownDeposit'
import { DashboardRow } from 'shared/ui/common/DashboardRow'

import type { Deposit } from 'modules/pools/types/Deposit'
import {
  getPoolAssetByAddress,
  getPoolAssetIcon,
} from 'modules/pools/constants/poolAssets'
import s from './DashboardRowDeposit.module.scss'

type Props = {
  deposit: Deposit
  poolAddress: string
  assetAddress: string
  className?: string
}

export function DashboardRowDeposit({
  deposit,
  poolAddress,
  assetAddress,
  className,
}: Props) {
  const chainId = useCurrentChain()
  const {
    liquidity,
    reward,
    // tokenStake
  } = deposit

  const depositedAsset = getPoolAssetByAddress(assetAddress, chainId)

  const apy = 12

  return (
    <DashboardRow className={className}>
      <InfoFieldValue
        label="Asset"
        value={
          depositedAsset ? (
            <>
              {getPoolAssetIcon(depositedAsset)} {depositedAsset}
            </>
          ) : (
            'Unknown Asset'
          )
        }
        className={s.column}
      />
      <InfoFieldValue
        label="Deposit"
        value={
          <>
            {ethers.utils.formatEther(liquidity)} {depositedAsset}
          </>
        }
        className={s.column}
      />
      <InfoFieldValue label="APY" value={<>{apy}%</>} className={s.column} />
      <InfoFieldValue
        label="Accrued interest"
        value={
          <>
            {ethers.utils.formatEther(reward)} {depositedAsset}
          </>
        }
        className={s.column}
      />
      <div className={s.column}>
        <DropdownDeposit
          poolAddress={poolAddress}
          onAddMore={() => console.log('onAddMore')}
        />
      </div>
    </DashboardRow>
  )
}
