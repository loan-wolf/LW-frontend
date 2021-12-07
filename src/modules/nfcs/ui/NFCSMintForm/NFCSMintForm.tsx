import { toPairs } from 'lodash'
import { utils as ethersUtils } from 'ethers'

import { useCallback, useMemo, useEffect } from 'react'
import { useSimpleReducer } from 'shared/hooks/useSimpleReducer'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'

import { Text } from 'shared/ui/common/Text'
import { TermsHint } from 'shared/ui/common/TermsHint'
import { Button } from 'shared/ui/controls/Button'
import { AddressIcon } from 'modules/blockChain/ui/AddressIcon'
import { ReactComponent as CrossSVG } from 'assets/close.svg'

import { trimMiddleString } from 'shared/utils/trimMiddleString'
import { ContractRociCreditToken } from 'modules/contracts/contracts'
import s from './NFCSMintForm.module.scss'
import { useTransactionSender } from 'modules/blockChain/hooks/useTransactionSender'

const SIGN_MSG_NONCE = ['TEST', 1] as const

type Props = {
  onTxSubmit?: (txHash: string) => void
}

export function NFCSMintForm({ onTxSubmit }: Props) {
  const { walletAddress } = useWeb3()
  const contractRociCreditToken = ContractRociCreditToken.useContractWeb3()
  const [signs, setSigns] = useSimpleReducer<
    Record<string, string | undefined>
  >({})

  const signedAddresses = useMemo(
    () => Object.keys(signs).filter(address => Boolean(signs[address])),
    [signs],
  )

  const isCurrentAddressSigned = signedAddresses.includes(
    walletAddress as string,
  )

  const populateMintTx = async () => {
    const addressSignPairs = toPairs(signs).filter(pair => Boolean(pair[1]))
    const resultAddresses = addressSignPairs.map(pair => pair[0])
    const resultSigns = addressSignPairs.map(pair => pair[1] as string)

    const populatedTx =
      await contractRociCreditToken.populateTransaction.mintToken(
        resultAddresses,
        resultSigns,
        ...SIGN_MSG_NONCE,
        {
          gasLimit: 500000,
        },
      )

    return populatedTx
  }
  const mintTx = useTransactionSender(populateMintTx)

  useEffect(() => {
    if (mintTx.isPending && mintTx.tx) {
      onTxSubmit?.(mintTx.tx.hash)
    }
  }, [mintTx.isPending, mintTx.tx, onTxSubmit])

  const handleAddAddress = useCallback(async () => {
    if (!walletAddress) return

    const messageHash = ethersUtils.solidityKeccak256(
      ['string', 'uint256'],
      SIGN_MSG_NONCE,
    )

    const signer = contractRociCreditToken.signer
    const sign = await signer.signMessage(ethersUtils.arrayify(messageHash))

    setSigns({ [walletAddress]: sign })
  }, [contractRociCreditToken.signer, setSigns, walletAddress])

  const handleRemoveAddress = useCallback(
    (address: string) => {
      setSigns({ [address]: undefined })
    },
    [setSigns],
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
        {signedAddresses.map(address => (
          <div key={address} className={s.addressRow}>
            <AddressIcon address={address} className={s.addressIcon} />
            <Text
              color="secondary"
              size={16}
              weight={500}
              className={s.addressLabel}
            >
              {trimMiddleString(address, 6)}
            </Text>
            {walletAddress === address && (
              <Text size={16} weight={500} className={s.addressLabel}>
                Primary
              </Text>
            )}
            <button
              type="button"
              className={s.addressControl}
              onClick={() => handleRemoveAddress(address)}
            >
              <CrossSVG />
            </button>
          </div>
        ))}
      </div>
      <Button
        fashion="secondary"
        size={72}
        isFullWidth
        onClick={handleAddAddress}
        className={s.addAddress}
        isDisabled={isCurrentAddressSigned}
      >
        {isCurrentAddressSigned
          ? 'Current address already signed'
          : 'Sign current address to bundle'}
      </Button>
      <Button
        size={72}
        isFullWidth
        onClick={mintTx.send}
        isLoading={mintTx.isSigning}
        isDisabled={signedAddresses.length === 0}
      >
        Create NFCS
      </Button>
      <TermsHint />
    </>
  )
}
