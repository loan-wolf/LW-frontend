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
// import s from './RouteDeposit.module.scss'

const depositOptions = [
  poolAssetOptions.USDC,
  poolAssetOptions.USDT,
  poolAssetOptions.DAI,
]

type FormData = {
  depositedAsset: string
  amount: string
  targetRiskPool: string
}

function RouteDeposit() {
  const formMethods = useForm<FormData>({
    defaultValues: {
      depositedAsset: '',
      amount: '',
      targetRiskPool: '',
    },
  })

  const submit = useCallback(formData => {
    console.log(formData)
  }, [])

  return (
    <Form formMethods={formMethods} onSubmit={submit}>
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
        rules={{
          required: formErrors.required,
          validate: val =>
            Number(val) < 0.01 ? 'Should not be less than 0.01' : false,
        }}
      />

      <SelectControl
        name="targetRiskPool"
        concat="top"
        placeholder="Target risk pool"
        rules={{ required: formErrors.required }}
        options={[
          { label: 'Low / 12% APY', value: '12' },
          { label: 'Middle / 15% APY', value: '15' },
          { label: 'High / 18% APY', value: '18' },
        ]}
      />

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
              value: '34.8 USD',
            },
            {
              label: (
                <>
                  Your share
                  <br />
                  of the pool
                </>
              ),
              value: '0.54%',
            },
          ]}
        />
      </FormInfoFramesList>

      <Button type="submit" fashion="secondary" isFullWidth>
        Deposit
      </Button>
      <TermsHint />
    </Form>
  )
}

export const routeDeposit = createRoute({
  headerTitle: 'Deposit',
  layoutType: 'narrow',
  component: RouteDeposit,
})
