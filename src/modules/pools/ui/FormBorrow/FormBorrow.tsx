import { useCallback, useState } from 'react'
import { useForm, useFormContext } from 'react-hook-form'

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

import * as formErrors from 'shared/constants/formErrors'
import {
  poolAssetOptions,
  getPoolAssetIcon,
} from 'modules/pools/constants/poolAssets'
import { formatNumber } from 'shared/utils/formatNumber'

const APR = 22
const LTV = 15
const REQUIRED_COLLATERAL = '1 ETH'
const LIQ_THRESHOLD = '85%'
const LIQ_PRICE = '1 ETH = 2547 USD'

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

type FormValues = {
  borrowedAsset: string
  amount: string
  term: string
  collateralAsset: string
}

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

// TODO: Update with actual response type after contract integration
export type SuccessData = FormValues

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

  const submit = useCallback(
    formData => {
      if (!isLocked) {
        setLocked(true)
      } else {
        console.log(formData)
        onSuccess(formData)
      }
    },
    [isLocked, onSuccess],
  )

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
            { label: 'Required collateral', value: REQUIRED_COLLATERAL },
          ]}
        />
        <FormInfoFrame
          info={[
            { label: 'Liquidation Threshold', value: LIQ_THRESHOLD },
            { label: 'Liquidation Price', value: LIQ_PRICE },
          ]}
        />
      </FormInfoFramesList>

      <FormSubmitter
        isLocked={isLocked}
        firstStepText="Borrow"
        onClickUnlock={handleUnlock}
      />
    </Form>
  )
}
