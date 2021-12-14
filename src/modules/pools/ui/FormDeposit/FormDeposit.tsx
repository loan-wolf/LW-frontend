import { useCallback, useState } from 'react'
import { useForm, useFormContext } from 'react-hook-form'
import { useDepositSubmit } from './useDepositSubmit'
import { useDepositRiskOptions } from 'modules/pools/hooks/useDepositRiskOptions'

import { InputControl } from 'shared/ui/controls/Input'
import { SelectControl } from 'shared/ui/controls/Select'
import { FormSubmitter } from 'shared/ui/common/FormSubmitter'
import { Form } from 'shared/ui/controls/Form'
import {
  FormInfoItem,
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
  poolAssetOptions,
  getPoolAssetIcon,
} from 'modules/pools/constants/poolAssets'
import { formatNumber } from 'shared/utils/formatNumber'
import type { FormValues, SuccessData } from './types'

const APY = 0.15
const POOL_SHARE = 0.58

const depositOptions = [
  poolAssetOptions.USDC,
  poolAssetOptions.USDT,
  poolAssetOptions.DAI,
]

function EstimatedEarning() {
  const { watch } = useFormContext<FormValues>()
  const amount = watch('amount')
  const earning = (Number(amount) * APY) / 30
  return <>{formatNumber(earning, 2)}</>
}

type Props = {
  onSuccess: (successData: SuccessData) => void
}

export function FormDeposit({ onSuccess }: Props) {
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

  const depositedAsset = formMethods.watch('depositedAsset')
  const { data: riskOptions = [] } = useDepositRiskOptions(depositedAsset)

  const { submit, isSubmitting, txAllowance } = useDepositSubmit({
    isLocked,
    setLocked,
    onSuccess,
  })

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
              validate: val => formErrors.notLess(val, 0.01) || true,
            }}
          />

          <SelectControl
            name="targetRiskPool"
            concat="top"
            placeholder="Target risk pool"
            rules={{ required: formErrors.required }}
            options={riskOptions}
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
            formatValue={v => riskOptions.find(i => i.value === v)?.label}
          />
        </FormLockedValuesList>
      )}

      <FormInfoFramesList>
        <FormInfoFrame>
          <FormInfoItem
            label={
              <>
                Estimated
                <br />
                earned per 30 days
              </>
            }
            value={
              <>
                <EstimatedEarning /> USD
              </>
            }
          />
          <FormInfoItem
            label={
              <>
                Your share
                <br />
                of the pool
              </>
            }
            value={`${POOL_SHARE}%`}
          />
        </FormInfoFrame>
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
        firstStepText="Deposit"
        onClickUnlock={handleUnlock}
      />
    </Form>
  )
}
