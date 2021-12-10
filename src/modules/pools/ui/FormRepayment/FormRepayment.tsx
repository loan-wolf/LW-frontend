import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRepaymentSubmit } from './useRepaymentSubmit'
import { useRepaymentCalcs } from './useRepaymentCalcs'
import { useLoanCalcs } from 'modules/pools/hooks/useLoanCalcs'

import { Text } from 'shared/ui/common/Text'
import { InputControl } from 'shared/ui/controls/Input'
import { SelectControl } from 'shared/ui/controls/Select'
// import { ToggleControl } from 'shared/ui/controls/Toggle'
import { InputMaxAction } from 'shared/ui/controls/InputMaxAction'
import { FormSubmitter } from 'shared/ui/common/FormSubmitter'
import { FormTransactionRow } from 'modules/blockChain/ui/FormTransactionRow'
import { Form } from 'shared/ui/controls/Form'
import {
  FormLockedValue,
  FormLockedValuesList,
} from 'shared/ui/common/FormLockedValue'
import {
  FormInfoItem,
  FormInfoFrame,
  FormInfoFramesList,
} from 'shared/ui/common/FormInfoFrame'

import type { Loan } from 'modules/pools/types/Loan'
import type { FormValues, SuccessData } from './types'
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

const TOTAL_COLLATERAL_AMOUNT = 4444

type Props = {
  loan: Loan
  loanId: string
  investorAddress: string
  onSuccess: (successData: SuccessData) => void
}

export function FormRepayment({
  loan,
  loanId,
  investorAddress,
  onSuccess,
}: Props) {
  const [isLocked, setLocked] = useState(false)
  const handleUnlock = useCallback(() => setLocked(false), [])

  const formMethods = useForm<FormValues>({
    shouldUnregister: false,
    defaultValues: {
      borrowedAsset: '',
      amount: '',
      returnCollateral: false,
      collateralAmount: '',
    },
  })

  const { setValue } = formMethods

  const {
    // apr,
    // principal,
    // interest,
    totalDebt,
    // totalDebtUSD,
    // maturityTime,
    // collateralAsset,
    // collateralAmount,
    borrowedAsset,
  } = useLoanCalcs({ loan, loanId, investorAddress })

  const { balance, maxAmount } = useRepaymentCalcs({
    totalDebt,
    borrowedAsset,
  })

  useEffect(() => {
    setValue('borrowedAsset', borrowedAsset || '')
  }, [borrowedAsset, setValue])

  const { submit, txApproval, txAllowance, isSubmitting } = useRepaymentSubmit({
    loanId,
    isLocked,
    setLocked,
    onSuccess,
  })

  const handleClickMaxAmount = useCallback(() => {
    setValue('amount', String(maxAmount))
  }, [setValue, maxAmount])

  const handleClickMaxCollateralAmount = useCallback(() => {
    setValue('collateralAmount', String(TOTAL_COLLATERAL_AMOUNT))
  }, [setValue])

  const returnCollateral = formMethods.watch('returnCollateral')

  return (
    <Form formMethods={formMethods} onSubmit={submit}>
      {!isLocked && (
        <>
          <SelectControl
            readonly
            name="borrowedAsset"
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
            rules={{
              required: formErrors.required,
              validate: (val: string) =>
                formErrors.notMore(val, Number(maxAmount)) || true,
            }}
            action={<InputMaxAction onClick={handleClickMaxAmount} />}
          />

          {/* TODO: develop ux for this kind of chained transaction */}
          {/* <ToggleControl label="Return collateral" name="returnCollateral" /> */}

          {returnCollateral && (
            <div className={s.inputWithHintWrap}>
              <InputControl
                name="collateralAmount"
                placeholder="Amount of collateral"
                onlyNumber
                withMargin={false}
                className={s.inputWithHint}
                rules={{
                  required: formErrors.required,
                  validate: (val: string) =>
                    formErrors.notMore(val, TOTAL_COLLATERAL_AMOUNT) || true,
                }}
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
            label="Borrowed asset"
            name="borrowedAsset"
            getIcon={getPoolAssetIcon}
          />
          <FormLockedValue label="Amount" name="amount" />
          {returnCollateral && (
            <FormLockedValue
              label="Amount of collateral"
              name="collateralAmount"
              subvalue="323 USD"
            />
          )}
        </FormLockedValuesList>
      )}

      <FormInfoFramesList>
        <FormInfoFrame>
          <FormInfoItem
            label="Total debt"
            value={totalDebt}
            sign={borrowedAsset}
            isTooltiped
          />
          <FormInfoItem
            label="Your balance"
            value={balance}
            sign={borrowedAsset}
            isTooltiped
          />
        </FormInfoFrame>
      </FormInfoFramesList>

      {isLocked && (
        <div>
          <FormTransactionRow label="Approving" tx={txApproval} />
          <FormTransactionRow label="Allowance" tx={txAllowance} />
        </div>
      )}

      <FormSubmitter
        isSubmitting={isSubmitting}
        isLocked={isLocked}
        firstStepText="Repay"
        onClickUnlock={handleUnlock}
      />
    </Form>
  )
}
