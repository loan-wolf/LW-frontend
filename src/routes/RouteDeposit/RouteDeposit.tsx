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
import { createRoute } from 'modules/router/utils/createRoute'
import { formatNumber } from 'shared/utils/formatNumber'
// import s from './RouteDeposit.module.scss'

const APY = 0.15
const POOL_SHARE = 0.58

const depositOptions = [
  poolAssetOptions.USDC,
  poolAssetOptions.USDT,
  poolAssetOptions.DAI,
]

const targetRiskOptions = [
  { label: 'Low / 12% APY', value: '12' },
  { label: 'Middle / 15% APY', value: '15' },
  { label: 'High / 18% APY', value: '18' },
]

const getTargetRiskLabel = (val: string) =>
  targetRiskOptions.find(o => o.value === val)?.label

type FormValues = {
  depositedAsset: string
  amount: string
  targetRiskPool: string
}

function EstimatedEarning() {
  const { watch } = useFormContext<FormValues>()
  const amount = watch('amount')
  const earning = (Number(amount) * APY) / 30
  return <>{formatNumber(earning, 2)}</>
}

function RouteDeposit() {
  const [isLocked, setLocked] = useState(false)
  const handleUnlock = useCallback(() => setLocked(false), [])

  const formMethods = useForm<FormValues>({
    shouldUnregister: false,
    defaultValues: {
      depositedAsset: '',
      amount: '',
      targetRiskPool: '',
    },
  })

  const submit = useCallback(
    formData => {
      if (!isLocked) {
        setLocked(true)
      } else {
        console.log(formData)
      }
    },
    [isLocked],
  )

  return (
    <Form formMethods={formMethods} onSubmit={submit}>
      {!isLocked && (
        <>
          <SelectControl
            name="depositedAsset"
            placeholder="Deposited asset"
            options={depositOptions}
            rules={{ required: formErrors.required }}
          />

          <InputControl
            name="amount"
            concat="bottom"
            placeholder="Amount"
            onlyNumber
            rules={{
              required: formErrors.required,
              validate: val =>
                Number(val) < 0.01 ? 'Should not be less than 0.01' : true,
            }}
          />

          <SelectControl
            name="targetRiskPool"
            concat="top"
            placeholder="Target risk pool"
            rules={{ required: formErrors.required }}
            options={targetRiskOptions}
          />
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
          <FormLockedValue
            label="Target risk pool"
            name="targetRiskPool"
            valueSize={16}
            formatValue={getTargetRiskLabel}
          />
        </FormLockedValuesList>
      )}

      <FormInfoFramesList>
        <FormInfoFrame
          info={[
            {
              label: (
                <>
                  Estimated
                  <br />
                  earned per 30 days
                </>
              ),
              value: (
                <>
                  <EstimatedEarning /> USD
                </>
              ),
            },
            {
              label: (
                <>
                  Your share
                  <br />
                  of the pool
                </>
              ),
              value: `${POOL_SHARE}%`,
            },
          ]}
        />
      </FormInfoFramesList>

      <FormSubmitter
        isLocked={isLocked}
        firstStepText="Deposit"
        onClickUnlock={handleUnlock}
      />
    </Form>
  )
}

export const routeDeposit = createRoute({
  headerTitle: 'Deposit',
  layoutType: 'narrow',
  component: RouteDeposit,
})
