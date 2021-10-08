import { useCallback } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from 'shared/ui/controls/Button'
import { TermsHint } from 'shared/ui/common/TermsHint'
import { InputControl } from 'shared/ui/controls/Input'
import { SelectControl } from 'shared/ui/controls/Select'
import {
  FormInfoFrame,
  FormInfoFramesList,
} from 'shared/ui/common/FormInfoFrame'
import { Form } from 'shared/ui/controls/Form'

import * as formErrors from 'shared/constants/formErrors'
import { poolAssetOptions } from 'modules/pools/constants/poolAssets'
import { createRoute } from 'modules/router/utils/createRoute'
// import s from './RouteBorrow.module.scss'

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

type FormData = {
  borrowedAsset: string
  amount: string
  term: string
  collateralAsset: string
}

function RouteBorrow() {
  const formMethods = useForm<FormData>({
    defaultValues: {
      borrowedAsset: '',
      amount: '',
      term: '',
      collateralAsset: '',
    },
  })

  const submit = useCallback(formData => {
    console.log(formData)
  }, [])

  return (
    <Form formMethods={formMethods} onSubmit={submit}>
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
        rules={{
          required: formErrors.required,
          validate: val =>
            Number(val) < 0.01 ? 'Should not be less than 0.01' : false,
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

      <FormInfoFramesList>
        <FormInfoFrame
          info={[
            { label: 'APR', value: '16%' },
            { label: 'Amount to be repaid', value: '1130 DAI' },
          ]}
        />
        <FormInfoFrame
          info={[
            { label: 'LTV', value: '15%' },
            { label: 'Required collateral', value: '1 ETH' },
          ]}
        />
        <FormInfoFrame
          info={[
            { label: 'Liquidation Threshold', value: '85%' },
            { label: 'Liquidation Price', value: '1 ETH = 2459 USD' },
          ]}
        />
      </FormInfoFramesList>

      <Button type="submit" fashion="secondary" isFullWidth>
        Borrow
      </Button>
      <TermsHint />
    </Form>
  )
}

export const routeBorrow = createRoute({
  headerTitle: 'Borrow',
  layoutType: 'narrow',
  component: RouteBorrow,
})
