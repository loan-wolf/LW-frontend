import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useBorrowSubmit } from './useBorrowSubmit'

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
import type { FormValues, SuccessData } from './types'
import { useBorrowFormCalcs } from './useBorrowFormCalcs'

const borrowOptions = [
  poolAssetOptions.USDC,
  poolAssetOptions.USDT,
  poolAssetOptions.DAI,
]

const collateralOptions = [poolAssetOptions.ETH, poolAssetOptions.WBTC]

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

  const { watch } = formMethods
  const amount = Number(watch('amount'))
  const borrowedAsset = watch('borrowedAsset')
  const collateralAsset = watch('collateralAsset')
  const term = Number(watch('term'))

  const {
    ltv,
    LIQ_THRESHOLD,
    apr,
    collateralAmount,
    liquidationPrice,
    amountToBeRepaid,
  } = useBorrowFormCalcs({
    amount,
    borrowedAsset,
    collateralAsset,
    term,
  })

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
        <FormInfoFrame>
          <FormInfoItem label="APR" value={apr && `${apr}%`} />
          <FormInfoItem
            label="Amount to be repaid"
            value={amountToBeRepaid}
            sign={borrowedAsset}
            isTooltiped
          />
        </FormInfoFrame>
        <FormInfoFrame>
          <FormInfoItem label="LTV" value={`${ltv}%`} />
          <FormInfoItem
            label="Required collateral"
            value={collateralAmount}
            sign={collateralAsset}
            isTooltiped
          />
        </FormInfoFrame>
        <FormInfoFrame>
          <FormInfoItem
            label="Liquidation Threshold"
            value={`${LIQ_THRESHOLD}%`}
          />
          <FormInfoItem
            label="Liquidation Price"
            value={liquidationPrice}
            sign={borrowedAsset}
            isTooltiped
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
        firstStepText="Borrow"
        onClickUnlock={handleUnlock}
      />
    </Form>
  )
}
