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
} from 'modules/pools/constants/poolAssets'
import {
  targetRiskOptions,
  getTargetRiskLabel,
} from 'modules/pools/constants/riskOptions'

const depositOptions = [
  poolAssetOptions.USDC,
  poolAssetOptions.USDT,
  poolAssetOptions.DAI,
]

const MAX_AMOUNT = 3333

const rulesAmount = {
  required: formErrors.required,
  validate: (val: string) =>
    formErrors.notLess(val, 1) || formErrors.notMore(val, MAX_AMOUNT) || true,
}

type FormValues = {
  asset: string
  amount: string
  risk: string
}

// TODO: Update with actual response type after contract integration
export type SuccessData = FormValues

type Props = {
  onSuccess: (successData: SuccessData) => void
}

export function FormWithdrawal({ onSuccess }: Props) {
  const [isLocked, setLocked] = useState(false)
  const handleUnlock = useCallback(() => setLocked(false), [])

  const formMethods = useForm<FormValues>({
    shouldUnregister: false,
    defaultValues: {
      asset: '',
      amount: '',
      risk: '',
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

  const handleClickMaxAmount = useCallback(() => {
    formMethods.setValue('amount', String(MAX_AMOUNT))
  }, [formMethods])

  return (
    <Form formMethods={formMethods} onSubmit={submit}>
      {!isLocked && (
        <>
          <SelectControl
            name="asset"
            placeholder="Asset"
            options={depositOptions}
            rules={{ required: formErrors.required }}
          />

          <InputControl
            name="amount"
            concat="bottom"
            placeholder="Amount"
            onlyNumber
            rules={rulesAmount}
            action={<InputMaxAction onClick={handleClickMaxAmount} />}
          />

          <SelectControl
            name="risk"
            concat="top"
            placeholder="Risk Pool / APY"
            options={targetRiskOptions}
            rules={{ required: formErrors.required }}
          />
        </>
      )}

      {isLocked && (
        <FormLockedValuesList>
          <FormLockedValue
            label="Deposited asset"
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
        firstStepText="Withdrawal"
        onClickUnlock={handleUnlock}
      />
    </Form>
  )
}
