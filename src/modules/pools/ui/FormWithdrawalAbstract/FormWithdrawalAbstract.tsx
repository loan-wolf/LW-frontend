import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

import { InputControl } from 'shared/ui/controls/Input'
import { SelectControl } from 'shared/ui/controls/Select'
import { InputMaxAction } from 'shared/ui/controls/InputMaxAction'
import { FormSubmitter } from 'shared/ui/common/FormSubmitter'
import { Form } from 'shared/ui/controls/Form'
import {
  FormLockedValue,
  FormLockedValuesList,
} from 'shared/ui/common/FormLockedValue'

import * as formErrors from 'shared/constants/formErrors'
import {
  poolAssetOptions,
  getPoolAssetIcon,
  PoolAsset,
} from 'modules/pools/constants/poolAssets'
import {
  targetRiskOptions,
  getTargetRiskLabel,
} from 'modules/pools/constants/riskOptions'
import type { FormValues } from './types'

const assetOptions = [
  poolAssetOptions.ETH,
  poolAssetOptions.USDC,
  poolAssetOptions.USDT,
  poolAssetOptions.DAI,
  poolAssetOptions.DAI2,
]

type Props = {
  defaultAsset: PoolAsset
  maxAmount?: string
  isSubmitting: boolean
  onSubmit: (formValues: FormValues) => void
}

export function FormWithdrawalAbstract({
  defaultAsset,
  maxAmount,
  isSubmitting,
  onSubmit,
}: Props) {
  const [isLocked, setLocked] = useState(false)
  const handleUnlock = useCallback(() => setLocked(false), [])

  const formMethods = useForm<FormValues>({
    shouldUnregister: false,
    defaultValues: {
      asset: defaultAsset,
      amount: '',
      risk: '',
    },
  })

  const submit = useCallback(
    formData => {
      if (!isLocked) {
        setLocked(true)
      } else {
        onSubmit(formData)
      }
    },
    [isLocked, onSubmit],
  )

  const handleClickMaxAmount = useCallback(() => {
    if (!maxAmount) return
    formMethods.setValue('amount', maxAmount)
  }, [maxAmount, formMethods])

  return (
    <Form formMethods={formMethods} onSubmit={submit}>
      {!isLocked && (
        <>
          <SelectControl
            readonly
            name="asset"
            placeholder="Asset"
            options={assetOptions}
            rules={{ required: formErrors.required }}
          />

          <InputControl
            name="amount"
            concat="bottom"
            placeholder="Amount"
            onlyNumber
            rules={{
              required: formErrors.required,
              validate: (val: string) =>
                // formErrors.notLess(val, 1) ||
                formErrors.notMore(val, Number(maxAmount)) || true,
            }}
            action={
              maxAmount && <InputMaxAction onClick={handleClickMaxAmount} />
            }
          />

          <SelectControl
            name="risk"
            concat="top"
            placeholder="Risk Pool / APY"
            options={targetRiskOptions}
            // rules={{ required: formErrors.required }}
          />
        </>
      )}

      {isLocked && (
        <FormLockedValuesList>
          <FormLockedValue
            label="Asset"
            name="asset"
            getIcon={getPoolAssetIcon}
          />
          <FormLockedValue label="Amount" name="amount" />
          <FormLockedValue
            label="Target risk pool"
            name="risk"
            valueSize={16}
            formatValue={getTargetRiskLabel}
          />
        </FormLockedValuesList>
      )}

      <FormSubmitter
        isLocked={isLocked}
        isSubmitting={isSubmitting}
        firstStepText="Withdrawal"
        onClickUnlock={handleUnlock}
      />
    </Form>
  )
}
