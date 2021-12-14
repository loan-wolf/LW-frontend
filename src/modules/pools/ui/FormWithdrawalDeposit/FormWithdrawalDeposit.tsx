import * as ethers from 'ethers'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'
import { useWithdrawalDepositSubmit } from './useWithdrawalDepositSubmit'
import { useDepositRiskOptions } from 'modules/pools/hooks/useDepositRiskOptions'

import { FormWithdrawalAbstract } from '../FormWithdrawalAbstract'
import {
  FormInfoItem,
  FormInfoFrame,
  FormInfoFramesList,
} from 'shared/ui/common/FormInfoFrame'

import type { SuccessData } from './types'
import { getILiquidityPoolByAddress } from 'modules/pools/utils/getILiquidityPoolContract'
import { ContractLiquidityFarm } from 'modules/contracts/contracts'

type Props = {
  poolAddress: string
  onSuccess: (res: SuccessData) => void
}

export function FormWithdrawalDeposit({ poolAddress, onSuccess }: Props) {
  const { chainId, walletAddress } = useWeb3()
  const { asset, risk } = getILiquidityPoolByAddress(chainId, poolAddress)
  const { data: riskOptions = [] } = useDepositRiskOptions(asset)
  const { data: deposit } = ContractLiquidityFarm.useSwrWeb3(
    'getStakeInfo',
    poolAddress,
    walletAddress!,
  )
  // TODO: calculate actual amount
  const depositedAmountWei = deposit?.liquidity
  const depositedAmount =
    depositedAmountWei && ethers.utils.formatEther(depositedAmountWei)

  const { submit, isSubmitting } = useWithdrawalDepositSubmit({
    poolAddress,
    onSuccess,
  })

  return (
    <FormWithdrawalAbstract
      defaultAsset={asset}
      defaultRisk={risk}
      riskOptions={riskOptions}
      maxAmount={depositedAmount}
      isSubmitting={isSubmitting}
      onSubmit={submit}
      info={
        <FormInfoFramesList>
          <FormInfoFrame>
            <FormInfoItem
              label="Deposited amount"
              value={depositedAmount}
              sign={asset}
              isTooltiped
            />
            <FormInfoItem label="" value="" />
          </FormInfoFrame>
        </FormInfoFramesList>
      }
    />
  )
}
