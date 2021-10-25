import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Text } from 'shared/ui/common/Text'
import { InputControl } from 'shared/ui/controls/Input'
import { SelectControl } from 'shared/ui/controls/Select'
import { ToggleControl } from 'shared/ui/controls/Toggle'
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
import s from './FormRepayment.module.scss'

const depositOptions = [
  poolAssetOptions.USDC,
  poolAssetOptions.USDT,
  poolAssetOptions.DAI,
]

const TOTAL_LOAN_AMOUNT = 3333
const TOTAL_COLLATERAL_AMOUNT = 4444

const rulesAmount = {
  required: formErrors.required,
  validate: (val: string) =>
    formErrors.notLess(val, 1) ||
    formErrors.notMore(val, TOTAL_LOAN_AMOUNT) ||
    true,
}

const rulesCollateralAmount = {
  required: formErrors.required,
  validate: (val: string) =>
    formErrors.notLess(val, 0.01) ||
    formErrors.notMore(val, TOTAL_COLLATERAL_AMOUNT) ||
    true,
}

type FormValues = {
  depositedAsset: string
  amount: string
  returnCollateral: boolean
  collateralAmount: string
}

// TODO: Update with actual response type after contract integration
export type SuccessData = FormValues

type Props = {
  onSuccess: (successData: SuccessData) => void
}

export function FormRepayment({ onSuccess }: Props) {
  const [isLocked, setLocked] = useState(false)
  const handleUnlock = useCallback(() => setLocked(false), [])

  const formMethods = useForm<FormValues>({
    shouldUnregister: false,
    defaultValues: {
      depositedAsset: '',
      amount: '',
      returnCollateral: false,
      collateralAmount: '',
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
    formMethods.setValue('amount', String(TOTAL_LOAN_AMOUNT))
  }, [formMethods])

  const handleClickMaxCollateralAmount = useCallback(() => {
    formMethods.setValue('collateralAmount', String(TOTAL_COLLATERAL_AMOUNT))
  }, [formMethods])

  const returnCollateral = formMethods.watch('returnCollateral')

  return (
    <Form formMethods={formMethods} onSubmit={submit}>
      {!isLocked && (
        <>
          <SelectControl
            name="depositedAsset"
            concat="bottom"
            placeholder="Deposited asset"
            options={depositOptions}
            rules={{ required: formErrors.required }}
          />

          <InputControl
            name="amount"
            concat="top"
            placeholder="Amount"
            onlyNumber
            rules={rulesAmount}
            action={<InputMaxAction onClick={handleClickMaxAmount} />}
          />

          <ToggleControl label="Return collateral" name="returnCollateral" />

          {returnCollateral && (
            <div className={s.inputWithHintWrap}>
              <InputControl
                name="collateralAmount"
                placeholder="Amount of collateral"
                onlyNumber
                withMargin={false}
                className={s.inputWithHint}
                rules={rulesCollateralAmount}
                action={
                  <InputMaxAction onClick={handleClickMaxCollateralAmount} />
                }
              />
              <div>
                <Text tag="span" size={14} weight={500} color="secondary">
                  Current USD value:{' '}
                </Text>
                <Text tag="span" size={14} weight={500} color="default">
                  2720 USD
                </Text>
              </div>
            </div>
          )}
        </>
      )}

      {isLocked && (
        <FormLockedValuesList>
          <FormLockedValue
            label="Deposited asset"
            name="depositedAsset"
            getIcon={getPoolAssetIcon}
          />
          <FormLockedValue label="Amount" name="amount" />
          {returnCollateral && (
            <FormLockedValue
              label="Amount of collateral"
              name="collateralAmount"
            />
          )}
        </FormLockedValuesList>
      )}

      <FormSubmitter
        isLocked={isLocked}
        firstStepText="Repay"
        onClickUnlock={handleUnlock}
      />
    </Form>
  )
}
