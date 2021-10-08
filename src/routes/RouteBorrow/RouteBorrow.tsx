import { Button } from 'shared/ui/controls/Button'
import { TermsHint } from 'shared/ui/common/TermsHint'
import { Input } from 'shared/ui/controls/Input'
import { Select } from 'shared/ui/controls/Select'
import {
  FormInfoFrame,
  FormInfoFramesList,
} from 'shared/ui/common/FormInfoFrame'

import { poolAssetOptions } from 'modules/pools/data/poolAssets'
import { createRoute } from 'modules/router/utils/createRoute'
// import s from './RouteBorrow.module.scss'

function RouteBorrow() {
  return (
    <>
      <Select placeholder="Borrowed asset" options={poolAssetOptions} />

      <Input concat="bottom" placeholder="Amount" />
      <Select
        concat="top"
        placeholder="Term"
        options={[
          { label: '30 days', value: 30 },
          { label: '60 days', value: 60 },
          { label: '90 days', value: 90 },
        ]}
      />

      <Select placeholder="Collateral asset" options={poolAssetOptions} />

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

      <Button fashion="secondary" isFullWidth>
        Borrow
      </Button>
      <TermsHint />
    </>
  )
}

export const routeBorrow = createRoute({
  headerTitle: 'Borrow',
  layoutType: 'narrow',
  component: RouteBorrow,
})
