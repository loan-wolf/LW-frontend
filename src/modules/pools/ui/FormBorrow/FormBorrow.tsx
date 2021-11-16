import * as ethers from 'ethers'
import { useCallback, useState } from 'react'
import { useForm, useFormContext } from 'react-hook-form'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'
import { useWalletInfo } from 'modules/wallet/hooks/useWalletInfo'
import { useCurrentChain } from 'modules/blockChain/hooks/useCurrentChain'

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

import { ContractInvestor } from 'modules/contracts/contracts'
import * as formErrors from 'shared/constants/formErrors'
import {
  PoolAsset,
  poolAssets,
  poolAssetOptions,
  getPoolAssetIcon,
  getPoolAssetAddress,
  getPoolAssetContract,
} from 'modules/pools/constants/poolAssets'
import { formatNumber } from 'shared/utils/formatNumber'
import { CollateralManager } from 'modules/contracts/contractAddresses'

const APR = 22
const LTV = 85
const LIQ_THRESHOLD = '85%'
const LIQ_PRICE = '1 ETH = 2547 USD'
const NCFSID = 1 // Oracle return hardcoded scores for now
const COLLATERAL_PRICE = {
  [poolAssets.DAI]: 1,
  [poolAssets.USDC]: 1,
  [poolAssets.USDT]: 1,
  [poolAssets.ETH]: 4765,
  [poolAssets.WBTC]: 1,
}

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

type FormValues = {
  borrowedAsset: PoolAsset | ''
  amount: string
  term: string
  collateralAsset: PoolAsset | ''
}

function AmountToRepay() {
  const { watch } = useFormContext<FormValues>()
  const amount = Number(watch('amount'))
  const term = Number(watch('term'))
  const asset = watch('borrowedAsset')
  const earning = (amount * (1 + APR / 100) * (term * 30)) / 12
  return (
    <>
      {formatNumber(earning, 2)} {asset}
    </>
  )
}

export type SuccessData = {
  tx: ethers.ContractTransaction
  formValues: FormValues
}

type Props = {
  onSuccess: (successData: SuccessData) => void
}

export function FormBorrow({ onSuccess }: Props) {
  const chainId = useCurrentChain()
  const { library } = useWeb3()
  const [isLocked, setLocked] = useState(false)
  const { walletAddress } = useWalletInfo()
  const handleUnlock = useCallback(() => setLocked(false), [])
  const contractInvestor = ContractInvestor.useContractWeb3()

  const formMethods = useForm<FormValues>({
    shouldUnregister: false,
    defaultValues: {
      borrowedAsset: '',
      amount: '',
      term: '',
      collateralAsset: '',
    },
  })

  const amount = Number(formMethods.watch('amount'))
  const collateralAsset = formMethods.watch('collateralAsset')
  const collateralAmount =
    collateralAsset && amount
      ? (amount / ((LTV / 100) * COLLATERAL_PRICE[collateralAsset])).toFixed(18)
      : '0'

  const submit = useCallback(
    async (formValues: FormValues) => {
      if (!walletAddress || !formValues.collateralAsset || !library) {
        return
      }

      if (!isLocked) {
        setLocked(true)
      } else {
        /**
         * Prepare necessary data
         */
        const amountWei = ethers.utils.parseEther(formValues.amount)
        const numberOfLoans = await contractInvestor.getNumberOfLoans(
          walletAddress,
        )
        const loanId = await contractInvestor.getId(
          walletAddress,
          numberOfLoans,
        )

        /**
         * Get collateral asset address
         */
        const collateralAddress = getPoolAssetAddress(
          formValues.collateralAsset,
          chainId,
        )

        if (!collateralAddress) {
          throw new Error('Address does not defined for this collateral asset')
        }

        /**
         * Approve token spending
         */
        const CollateralAssetContract = getPoolAssetContract(
          formValues.collateralAsset,
        )

        if (!CollateralAssetContract) {
          throw new Error('Contract does not defined for this collateral asset')
        }

        const collateralAssetContract = CollateralAssetContract.connectWeb3({
          chainId,
          library: library.getSigner(),
        })

        const txApprove = await collateralAssetContract.approve(
          CollateralManager[chainId],
          amountWei,
        )

        await txApprove.wait()

        const hash = ethers.utils.keccak256(
          ethers.utils.defaultAbiCoder.encode(
            ['address', 'uint256'],
            [contractInvestor.address, loanId],
          ),
        )

        /**
         * Get sig
         */
        const signature = await contractInvestor.signer.signMessage(
          ethers.utils.arrayify(hash),
        )

        /**
         * Send transaction
         */
        const tx = await contractInvestor.borrow(
          amountWei,
          Number(formValues.term),
          NCFSID,
          ethers.utils.parseEther(collateralAmount),
          collateralAddress,
          hash,
          signature,
          {
            gasLimit: 1000000,
          },
        )

        onSuccess({ tx, formValues })
      }
    },
    [
      library,
      walletAddress,
      isLocked,
      chainId,
      contractInvestor,
      collateralAmount,
      onSuccess,
    ],
  )

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
        <FormInfoFrame
          info={[
            { label: 'APR', value: `${APR}%` },
            { label: 'Amount to be repaid', value: <AmountToRepay /> },
          ]}
        />
        <FormInfoFrame
          info={[
            { label: 'LTV', value: `${LTV}%` },
            { label: 'Required collateral', value: collateralAmount },
          ]}
        />
        <FormInfoFrame
          info={[
            { label: 'Liquidation Threshold', value: LIQ_THRESHOLD },
            { label: 'Liquidation Price', value: LIQ_PRICE },
          ]}
        />
      </FormInfoFramesList>

      <FormSubmitter
        isLocked={isLocked}
        firstStepText="Borrow"
        onClickUnlock={handleUnlock}
      />
    </Form>
  )
}
