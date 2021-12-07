import * as ethers from 'ethers'

import { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSWR } from 'modules/network/hooks/useSwr'
import { useRepaymentSubmit } from './useRepaymentSubmit'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'
import { useAssetContractGetter } from 'modules/pools/hooks/useAssetContractGetter'

import { Text } from 'shared/ui/common/Text'
import { InputControl } from 'shared/ui/controls/Input'
import { SelectControl } from 'shared/ui/controls/Select'
import { ToggleControl } from 'shared/ui/controls/Toggle'
import { InputMaxAction } from 'shared/ui/controls/InputMaxAction'
import { FormSubmitter } from 'shared/ui/common/FormSubmitter'
import { FormTransactionRow } from 'modules/blockChain/ui/FormTransactionRow'
import { Form } from 'shared/ui/controls/Form'
import {
  FormLockedValue,
  FormLockedValuesList,
} from 'shared/ui/common/FormLockedValue'

import type { Loan } from 'modules/pools/types/Loan'
import type { FormValues, SuccessData } from './types'
import * as formErrors from 'shared/constants/formErrors'
import {
  poolAssetOptions,
  getPoolAssetByAddress,
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
  onSuccess: (successData: SuccessData) => void
}

export function FormRepayment({ loan, loanId, onSuccess }: Props) {
  const { chainId, walletAddress } = useWeb3()
  const getAssetContract = useAssetContractGetter()
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

  const { setValue } = formMethods
  const { ERC20Address } = loan

  const depositedAsset = getPoolAssetByAddress(ERC20Address, chainId)

  useEffect(() => {
    setValue('depositedAsset', depositedAsset || '')
  }, [depositedAsset, setValue])

  const maxAmountWei = useSWR(
    depositedAsset ? `repayment-max-${depositedAsset}` : null,
    () => {
      if (!depositedAsset || !walletAddress) return null
      const contract = getAssetContract(depositedAsset)
      const balance = contract.balanceOf(walletAddress)
      return balance
    },
  )

  const maxAmount =
    maxAmountWei.data && Number(ethers.utils.formatEther(maxAmountWei.data))

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
            rules={{
              required: formErrors.required,
              validate: (val: string) =>
                // TODO: not less than 1
                formErrors.notLess(val, 0.1) ||
                formErrors.notMore(val, Number(maxAmount)) ||
                true,
            }}
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
                rules={{
                  required: formErrors.required,
                  validate: (val: string) =>
                    formErrors.notLess(val, 0.01) ||
                    formErrors.notMore(val, TOTAL_COLLATERAL_AMOUNT) ||
                    true,
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
            label="Deposited asset"
            name="depositedAsset"
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
