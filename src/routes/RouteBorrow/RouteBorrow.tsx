import { useState } from 'react'

import { Text } from 'shared/ui/common/Text'
import { FormBorrow, SuccessData } from 'modules/pools/ui/FormBorrow'
import { ContractSuccessTitle } from 'shared/ui/common/ContractSuccessTitle'
import { ContractSuccessField } from 'shared/ui/common/ContractSuccessField'
import { NarrowWrapper } from 'shared/ui/layout/NarrowWrapper'

import { getPoolAssetIcon } from 'modules/pools/constants/poolAssets'
import { createRoute } from 'modules/router/utils/createRoute'
import s from './RouteBorrow.module.scss'

function RouteBorrow() {
  const [successData, setSuccessData] = useState<SuccessData | null>(null)

  if (!successData) {
    return (
      <NarrowWrapper>
        <FormBorrow onSuccess={setSuccessData} />
      </NarrowWrapper>
    )
  }

  return (
    <>
      <ContractSuccessTitle>Deposit Successful.</ContractSuccessTitle>

      <div className={s.successInfo}>
        <div className={s.successInfoColumn}>
          <ContractSuccessField
            label="Asset"
            value={
              <>
                {getPoolAssetIcon(successData.borrowedAsset)}{' '}
                {successData.borrowedAsset}
              </>
            }
          />
          <ContractSuccessField label="APR" value="13%" />
        </div>

        <div className={s.successInfoColumn}>
          <ContractSuccessField
            label="Total debt"
            value={
              <>
                {successData.amount} {successData.borrowedAsset}&nbsp;
                <Text tag="span" size={16} color="secondary">
                  ({Number(successData.amount) * 23} USD)
                </Text>
              </>
            }
          />
          <div className={s.fieldsCouple}>
            <ContractSuccessField
              label="Principal"
              value={
                <>
                  {successData.amount} {successData.borrowedAsset}
                </>
              }
            />
            <ContractSuccessField
              label="Interest"
              value={
                <>
                  {successData.amount} {successData.borrowedAsset}
                </>
              }
            />
          </div>
        </div>

        <div className={s.successInfoColumn}>
          <ContractSuccessField
            label="Collateral Amount"
            value={
              <>
                {123} {successData.collateralAsset}
              </>
            }
          />
          <ContractSuccessField
            label="Maturity time "
            value={<>2021-10-10 19:59:59</>}
          />
        </div>
      </div>

      <ContractSuccessField label="Loan Id" value={<>0xaqw11..98</>} />
    </>
  )
}

export const routeBorrow = createRoute({
  headerTitle: 'Borrow',
  layoutType: 'narrow-extended',
  component: RouteBorrow,
})
