import * as ethers from 'ethers'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'
import { useWithdrawalCollateralSubmit } from './useWithdrawalCollateralSubmit'

import { FormWithdrawalAbstract } from '../FormWithdrawalAbstract'
import {
  FormInfoItem,
  FormInfoFrame,
  FormInfoFramesList,
} from 'shared/ui/common/FormInfoFrame'

import type { Loan } from 'modules/pools/types/Loan'
import type { SuccessData } from './types'
import { getERCAssetByAddress } from 'modules/pools/constants/poolAssets'

type Props = {
  loan: Loan
  loanId: string
  collateralAddress: string
  collateralAmountWei: ethers.BigNumberish
  onSuccess: (res: SuccessData) => void
}

export function FormWithdrawalCollateral({
  loan,
  loanId,
  collateralAddress,
  collateralAmountWei,
  onSuccess,
}: Props) {
  const { chainId } = useWeb3()
  const asset = getERCAssetByAddress(collateralAddress, chainId)
  const collateralAmount = ethers.utils.formatEther(collateralAmountWei)

  const { submit, isSubmitting } = useWithdrawalCollateralSubmit({
    loanId,
    onSuccess,
  })

  if (!asset) return <>Unknown collateral asset</>

  return (
    <FormWithdrawalAbstract
      defaultAsset={asset}
      maxAmount={collateralAmount}
      isSubmitting={isSubmitting}
      onSubmit={submit}
      riskOptions={[{ label: 'Work in progress', value: '' }]}
      info={
        <FormInfoFramesList>
          <FormInfoFrame>
            <FormInfoItem
              label="Collateral amount"
              value={collateralAmount}
              sign={asset}
              isTooltiped
            />
            <FormInfoItem
              label="Loan id"
              value={loanId}
              isTooltiped
              tooltipMaxWith={210}
            />
          </FormInfoFrame>
        </FormInfoFramesList>
      }
    />
  )
}
