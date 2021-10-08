import { useState } from 'react'

import { FormDeposit, SuccessData } from 'modules/pools/ui/FormDeposit'
import { ContractSuccessTitle } from 'shared/ui/common/ContractSuccessTitle'
import { ContractSuccessField } from 'shared/ui/common/ContractSuccessField'
import { NarrowWrapper } from 'shared/ui/layout/NarrowWrapper'

import { getPoolAssetIcon } from 'modules/pools/constants/poolAssets'
import { createRoute } from 'modules/router/utils/createRoute'
import s from './RouteDeposit.module.scss'

function RouteDeposit() {
  const [successData, setSuccessData] = useState<SuccessData | null>(null)

  if (successData) {
    return (
      <>
        <ContractSuccessTitle>Loan is disbursed.</ContractSuccessTitle>
        <div className={s.successInfo}>
          <ContractSuccessField
            label="Asset"
            value={
              <>
                {getPoolAssetIcon(successData.depositedAsset)}{' '}
                {successData.depositedAsset}
              </>
            }
          />
          <ContractSuccessField
            label="Deposit"
            value={
              <>
                {successData.amount} {successData.depositedAsset}
              </>
            }
          />
          <ContractSuccessField label="APY" value={<>13%</>} />
          <ContractSuccessField
            label="Accrued interest"
            value={<>45 {successData.depositedAsset}</>}
          />
        </div>
      </>
    )
  }

  return (
    <NarrowWrapper>
      <FormDeposit onSuccess={setSuccessData} />
    </NarrowWrapper>
  )
}

export const routeDeposit = createRoute({
  headerTitle: 'Deposit',
  layoutType: 'narrow-extended',
  component: RouteDeposit,
})
