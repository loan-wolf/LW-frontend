import { useCallback, useState } from 'react'
import { useForm, useFormContext } from 'react-hook-form'
import { useBorrowSubmit } from './useBorrowSubmit'

import { Text } from 'shared/ui/common/Text'
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
import { TransactionStatusBadge } from 'modules/blockChain/ui/TransactionStatusBadge'

import * as formErrors from 'shared/constants/formErrors'
import {
  poolAssets,
  poolAssetOptions,
  getPoolAssetIcon,
} from 'modules/pools/constants/poolAssets'
import { formatNumber } from 'shared/utils/formatNumber'
import type { FormValues, SuccessData } from './types'

import s from './FormBorrow.module.scss'

const APR = 22
const LTV = 85
const LIQ_THRESHOLD = '85%'
const LIQ_PRICE = '1 ETH = 2547 USD'
const COLLATERAL_PRICE = {
  [poolAssets.DAI]: 1,
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
  poolAssetOptions.USDC,
  poolAssetOptions.USDT,
  poolAssetOptions.ETH,
  poolAssetOptions.WBTC,
]

function AmountToRepay() {
  const { watch } = useFormContext<FormValues>()
  const amount = Number(watch('amount'))
  const term = Number(watch('term'))
  const asset = watch('borrowedAsset')
  const earning = (amount * (1 + APR / 100) * (term * 30)) / 12
  return (
    <>
      {formatNumber(earning, 2)} {asset}
    </>
  )
}

type Props = {
  onSuccess: (successData: SuccessData) => void
}

export function FormBorrow({ onSuccess }: Props) {
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

  const amount = Number(formMethods.watch('amount'))
  const collateralAsset = formMethods.watch('collateralAsset')
  const collateralAmount =
    collateralAsset && amount
      ? (amount / ((LTV / 100) * COLLATERAL_PRICE[collateralAsset])).toFixed(18)
      : '0'

  const { submit, txAllowance, txBorrow } = useBorrowSubmit({
    isLocked,
    setLocked,
    onSuccess,
    collateralAmount,
  })

  const isSubmitting =
    txAllowance.isSigning ||
    txAllowance.isPending ||
    txBorrow.isSigning ||
    txBorrow.isPending

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
            { label: 'APR', value: `${APR}%` },
            { label: 'Amount to be repaid', value: <AmountToRepay /> },
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
        <div className={s.allowanceInfo}>
          <Text size={14}>Token spending approving: </Text>
          <TransactionStatusBadge
            status={txAllowance.status}
            onOpen={
              !txAllowance.isEmpty && !txAllowance.isSigning
                ? txAllowance.open
                : undefined
            }
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
