import * as ethers from 'ethers'
import { useMemo } from 'react'
import { useCurrentChain } from 'modules/blockChain/hooks/useCurrentChain'
import { useWithdrawalCollateral } from './useWithdrawalCollateral'

import { FormWithdrawalAbstract } from '../FormWithdrawalAbstract'

import type { Loan } from 'modules/pools/types/Loan'
import type { SuccessData } from './types'
import { getPoolAssetByAddress } from 'modules/pools/constants/poolAssets'

type Props = {
  loan: Loan
  loanId: string
  collateralAddress: string
  collateralAmount: ethers.BigNumberish
  onSuccess: (res: SuccessData) => void
}

export function FormWithdrawalCollateral({
  loan,
  loanId,
  collateralAddress,
  collateralAmount,
  onSuccess,
}: Props) {
  const chainId = useCurrentChain()
  const asset = useMemo(
    () => getPoolAssetByAddress(collateralAddress, chainId),
    [collateralAddress, chainId],
  )

  const { submit, isSubmitting } = useWithdrawalCollateral({
    loanId,
    onSuccess,
  })

  if (!asset) return <>Unknown collateral asset</>

  return (
    <FormWithdrawalAbstract
      defaultAsset={asset}
      maxAmount={ethers.utils.formatEther(collateralAmount)}
      isSubmitting={isSubmitting}
      onSubmit={submit}
    />
  )
}
