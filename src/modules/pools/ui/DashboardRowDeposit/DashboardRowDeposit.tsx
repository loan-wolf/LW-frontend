import * as ethers from 'ethers'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'

import { InfoFieldValue } from 'shared/ui/common/InfoFieldValue'
import { DropdownDeposit } from '../DropdownDeposit'
import { DashboardRow } from 'shared/ui/common/DashboardRow'

import type { Deposit } from 'modules/pools/types/Deposit'
import {
  getERCAssetByAddress,
  getPoolAssetIcon,
} from 'modules/pools/constants/poolAssets'
import s from './DashboardRowDeposit.module.scss'

type Props = {
  apy: ethers.BigNumberish
  deposit: Deposit
  poolAddress: string
  assetAddress: string
  className?: string
}

export function DashboardRowDeposit({
  apy,
  deposit,
  poolAddress,
  assetAddress,
  className,
}: Props) {
  const { chainId } = useWeb3()
  const {
    liquidity,
    reward,
    // tokenStake
  } = deposit

  const depositedAsset = getERCAssetByAddress(assetAddress, chainId)
  // TODO: calculate actual amount
  const depositedAmount = ethers.utils.formatEther(liquidity)

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
        isTruncated
        label="Deposit"
        value={depositedAmount}
        sign={depositedAsset}
        className={s.column}
      />
      <InfoFieldValue
        label="APY"
        value={<>{Number(apy) / 100}%</>}
        className={s.column}
      />
      <InfoFieldValue
        isTruncated
        label="Accrued interest"
        value={ethers.utils.formatEther(reward)}
        sign={depositedAsset}
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
