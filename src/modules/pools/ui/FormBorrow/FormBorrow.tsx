import * as ethers from 'ethers'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'
import { useBorrowSubmit } from './useBorrowSubmit'

import { InputControl } from 'shared/ui/controls/Input'
import { SelectControl } from 'shared/ui/controls/Select'
import { FormSubmitter } from 'shared/ui/common/FormSubmitter'
import { Form } from 'shared/ui/controls/Form'
import {
  FormInfoFrame,
  FormInfoFramesList,
} from 'shared/ui/common/FormInfoFrame'
import {
  FormLockedValue,
  FormLockedValuesList,
} from 'shared/ui/common/FormLockedValue'
import { FormTransactionRow } from 'modules/blockChain/ui/FormTransactionRow'

import * as formErrors from 'shared/constants/formErrors'
import {
  ContractInvestor,
  ContractPriceFeed,
} from 'modules/contracts/contracts'
import {
  poolAssets,
  poolAssetOptions,
  getPoolAssetIcon,
  getPoolAssetAddress,
} from 'modules/pools/constants/poolAssets'
import { formatNumber } from 'shared/utils/formatNumber'
import type { FormValues, SuccessData } from './types'

const LTV = 12
const LIQ_THRESHOLD = '—'
const LIQ_PRICE = '—'
const COLLATERAL_PRICE = {
  [poolAssets.DAI]: 1,
  [poolAssets.DAI2]: 1,
  [poolAssets.USDC]: 1,
  [poolAssets.USDT]: 1,
  [poolAssets.ETH]: 4765,
  [poolAssets.WBTC]: 1,
}

const borrowOptions = [
  poolAssetOptions.USDC,
  poolAssetOptions.USDT,
  poolAssetOptions.DAI,
]

const collateralOptions = [
  poolAssetOptions.DAI,
  // poolAssetOptions.USDC,
  // poolAssetOptions.USDT,
  poolAssetOptions.ETH,
  // poolAssetOptions.WBTC,
]

type Props = {
  onSuccess: (successData: SuccessData) => void
}

export function FormBorrow({ onSuccess }: Props) {
  const { chainId } = useWeb3()
  const [isLocked, setLocked] = useState(false)
  const handleUnlock = useCallback(() => setLocked(false), [])

  const formMethods = useForm<FormValues>({
    shouldUnregister: false,
    defaultValues: {
      borrowedAsset: '',
      amount: '',
      term: '',
      collateralAsset: '',
    },
  })

  const { watch } = formMethods

  const amount = Number(watch('amount'))
  const borrowedAsset = watch('borrowedAsset')
  const collateralAsset = watch('collateralAsset')
  const term = Number(watch('term'))

  const collateralAmount =
    collateralAsset && amount
      ? (amount / ((LTV / 100) * COLLATERAL_PRICE[collateralAsset])).toFixed(18)
      : '0'

  // TODO: Must depends on `borrowedAsset`
  const { data: aprData } = ContractInvestor.useSwrWeb3('interestRate')
  const apr = aprData && Number(aprData) / 100
  const earning = apr && (amount * (1 + apr / 100) * (term * 30)) / 12

  const borrowedAddress =
    borrowedAsset && getPoolAssetAddress(borrowedAsset, chainId)

  const { data: borrowedPrice } = ContractPriceFeed.useSwrWeb3(
    borrowedAddress ? 'getLatestPriceUSD' : null,
    borrowedAddress!,
  )

  const collateralAddress =
    collateralAsset && getPoolAssetAddress(collateralAsset, chainId)

  const { data: collateralPrice } = ContractPriceFeed.useSwrWeb3(
    collateralAddress ? 'getLatestPriceUSD' : null,
    collateralAddress!,
  )

  // TODO: Use this numbers in calculations when contract will be fixed
  console.log(
    Number(borrowedPrice),
    Number(collateralPrice),
    borrowedPrice && ethers.utils.formatEther(borrowedPrice),
    collateralPrice && ethers.utils.formatEther(collateralPrice),
  )

  const { submit, txAllowance, isSubmitting } = useBorrowSubmit({
    isLocked,
    setLocked,
    onSuccess,
    collateralAmount,
  })

  return (
    <Form formMethods={formMethods} onSubmit={submit}>
      {!isLocked && (
        <>
          <SelectControl
            name="borrowedAsset"
            placeholder="Borrowed asset"
            options={borrowOptions}
            rules={{ required: formErrors.required }}
          />

          <InputControl
            name="amount"
            concat="bottom"
            placeholder="Amount"
            onlyNumber
            rules={{
              required: formErrors.required,
              validate: val => formErrors.notLess(val, 0.01) || true,
            }}
          />

          <SelectControl
            name="term"
            concat="top"
            placeholder="Term"
            rules={{ required: formErrors.required }}
            options={[
              { label: '30 days', value: '30' },
              { label: '60 days', value: '60' },
              { label: '90 days', value: '90' },
            ]}
          />

          <SelectControl
            name="collateralAsset"
            placeholder="Collateral asset"
            options={collateralOptions}
            rules={{ required: formErrors.required }}
          />
        </>
      )}

      {isLocked && (
        <FormLockedValuesList>
          <FormLockedValue
            label="Borrowed asset"
            name="borrowedAsset"
            getIcon={getPoolAssetIcon}
          />
          <FormLockedValue label="Amount" name="amount" />
          <FormLockedValue
            label="Collateral asset"
            name="collateralAsset"
            getIcon={getPoolAssetIcon}
          />
        </FormLockedValuesList>
      )}

      <FormInfoFramesList>
        <FormInfoFrame
          info={[
            { label: 'APR', value: apr && `${apr}%` },
            {
              label: 'Amount to be repaid',
              value: earning && `${formatNumber(earning, 2)} ${borrowedAsset}`,
            },
          ]}
        />
        <FormInfoFrame
          info={[
            { label: 'LTV', value: `${LTV}%` },
            {
              label: 'Required collateral',
              value: collateralAmount,
              isTooltiped: true,
            },
          ]}
        />
        <FormInfoFrame
          info={[
            { label: 'Liquidation Threshold', value: LIQ_THRESHOLD },
            { label: 'Liquidation Price', value: LIQ_PRICE },
          ]}
        />
      </FormInfoFramesList>

      {isLocked && (
        <div>
          <FormTransactionRow
            label="Token spending approving"
            tx={txAllowance}
          />
        </div>
      )}

      <FormSubmitter
        isLocked={isLocked}
        isSubmitting={isSubmitting}
        firstStepText="Borrow"
        onClickUnlock={handleUnlock}
      />
    </Form>
  )
}
