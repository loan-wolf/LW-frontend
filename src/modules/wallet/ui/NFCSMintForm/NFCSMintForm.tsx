import { noop, toPairs } from 'lodash'
import { utils as ethersUtils, BytesLike } from 'ethers'
import { useCallback, useState } from 'react'
import { useSimpleReducer } from 'shared/hooks/useSimpleReducer'
import { usePermittedAddresses } from 'modules/wallet/hooks/usePermittedAddresses'

import { Text } from 'shared/ui/common/Text'
import { TermsHint } from 'shared/ui/common/TermsHint'
import { Button } from 'shared/ui/controls/Button'
import { Checkbox } from 'shared/ui/controls/Checkbox'
import { AddressIcon } from 'modules/blockChain/ui/AddressIcon'

import { trimAddress } from 'modules/blockChain/utils/trimAddress'
import { ContractRociCreditToken } from 'modules/contracts/contracts'
import s from './NFCSMintForm.module.scss'

const SIGN_MSG_NONCE = ['TEST', 1] as const

type Props = {
  onSuccess?: () => void
}

export function NFCSMintForm({ onSuccess }: Props) {
  const addresses = usePermittedAddresses()
  const contractRociCreditToken = ContractRociCreditToken.useContractWeb3()

  const [isLoading, setLoading] = useState(false)
  const [signs, setSigns] = useSimpleReducer<
    Record<string, string | undefined>
  >({})

  const handleMint = useCallback(async () => {
    if (!addresses.data) return
    try {
      setLoading(true)
      const addressSignPairs = toPairs(signs).filter(pair => Boolean(pair[1]))
      const resultAddresses = addressSignPairs.map(pair => pair[0])
      const resultSigns = addressSignPairs.map(pair => pair[1])

      await contractRociCreditToken.mintToken(
        resultAddresses,
        resultSigns as BytesLike[],
        ...SIGN_MSG_NONCE,
        {
          gasLimit: 100000,
        },
      )
      onSuccess?.()
    } catch (e) {
      console.error(e)
      setLoading(false)
    }
  }, [addresses, signs, contractRociCreditToken, onSuccess])

  const handleToggleSignAddress = useCallback(
    async address => {
      if (!signs[address]) {
        const messageHash = ethersUtils.solidityKeccak256(
          ['string', 'uint256'],
          SIGN_MSG_NONCE,
        )

        const signer = contractRociCreditToken.signer
        const sign = await signer.signMessage(ethersUtils.arrayify(messageHash))

        setSigns({ [address]: sign })
      } else {
        setSigns({ [address]: undefined })
      }
    },
    [contractRociCreditToken.signer, signs, setSigns],
  )

  return (
    <>
      <Text size={44} weight={700} isUppercased isCentered className={s.title}>
        Mint NFCS
      </Text>
      <Text
        size={12}
        weight={400}
        isUppercased
        isCentered
        color="secondary"
        className={s.description}
      >
        <div className={s.descriptionStep}>
          Select addresses to{' '}
          <span className={s.highlight}>add to the bundle</span>
        </div>
        <div className={s.descriptionStep}>
          The address that is{' '}
          <span className={s.highlight}>currently selected as primary</span>{' '}
          in&nbsp;Metamask will be used for the credit payout
        </div>
        <div className={s.descriptionStep}>
          Click <span className={s.highlight}>«Create NFCS»</span>
        </div>
      </Text>
      <div className={s.addresses}>
        {addresses.data?.map(address => (
          <div
            key={address}
            className={s.addressRow}
            onClick={() => handleToggleSignAddress(address)}
          >
            <AddressIcon address={address} className={s.addressIcon} />
            <Text size={16} weight={500} className={s.addressLabel}>
              {trimAddress(address, 6)}
            </Text>
            <Checkbox
              checked={Boolean(signs[address])}
              onChange={noop}
              className={s.addressCheckbox}
            />
          </div>
        ))}
      </div>
      <Button size={72} isFullWidth onClick={handleMint} isLoading={isLoading}>
        Create NFCS
      </Button>
      <TermsHint />
    </>
  )
}
