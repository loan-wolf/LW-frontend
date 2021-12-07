import * as ethers from 'ethers'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'
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
  const { chainId } = useWeb3()
  const asset = getPoolAssetByAddress(collateralAddress, chainId)

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
