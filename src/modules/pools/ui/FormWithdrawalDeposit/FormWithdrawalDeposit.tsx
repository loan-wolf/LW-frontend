// import * as ethers from 'ethers'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'
import { useWithdrawalDepositSubmit } from './useWithdrawalDepositSubmit'

import { FormWithdrawalAbstract } from '../FormWithdrawalAbstract'

import type { SuccessData } from './types'
import { getPoolAssetByAddress } from 'modules/pools/constants/poolAssets'

type Props = {
  poolAddress: string
  depositedAddress: string
  // depositedAmount: ethers.BigNumberish
  onSuccess: (res: SuccessData) => void
}

export function FormWithdrawalDeposit({
  poolAddress,
  depositedAddress,
  // depositedAmount,
  onSuccess,
}: Props) {
  const { chainId } = useWeb3()
  const asset = getPoolAssetByAddress(depositedAddress, chainId)

  const { submit, isSubmitting } = useWithdrawalDepositSubmit({
    poolAddress,
    onSuccess,
  })

  if (!asset) return <>Unknown deposited asset</>

  return (
    <FormWithdrawalAbstract
      defaultAsset={asset}
      // maxAmount={ethers.utils.formatEther(depositedAmount)}
      isSubmitting={isSubmitting}
      onSubmit={submit}
    />
  )
}