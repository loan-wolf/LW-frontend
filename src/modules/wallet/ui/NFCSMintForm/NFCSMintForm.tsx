import { noop } from 'lodash'
import { useCallback } from 'react'
import { useSimpleReducer } from 'shared/hooks/useSimpleReducer'
import { usePermittedAddresses } from 'modules/wallet/hooks/usePermittedAddresses'

import { Text } from 'shared/ui/common/Text'
import { Button } from 'shared/ui/controls/Button'
import { Checkbox } from 'shared/ui/controls/Checkbox'
import { AddressIcon } from 'modules/blockChain/ui/AddressIcon'

import { trimAddress } from 'modules/blockChain/utils/trimAddress'
import s from './NFCSMintForm.module.scss'

type Props = {
  onSuccess?: () => void
}

export function NFCSMintForm({ onSuccess }: Props) {
  const addresses = usePermittedAddresses()
  const [checkedAddresses, setCheckedAddress] = useSimpleReducer<
    Record<string, boolean>
  >({})

  const handleToggleAddress = useCallback(
    address => {
      setCheckedAddress({ [address]: !checkedAddresses[address] })
    },
    [checkedAddresses, setCheckedAddress],
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
            onClick={() => handleToggleAddress(address)}
          >
            <AddressIcon address={address} className={s.addressIcon} />
            <Text size={16} weight={500} className={s.addressLabel}>
              {trimAddress(address, 6)}
            </Text>
            <Checkbox
              isChecked={Boolean(checkedAddresses[address])}
              onChange={noop}
              className={s.addressCheckbox}
            />
          </div>
        ))}
      </div>
      <Button
        size={72}
        isFullWidth
        className={s.createButton}
        onClick={onSuccess}
      >
        Create NFCS
      </Button>
      <Text isCentered size={14} weight={500} color="secondary">
        by clicking this button you agree to the{' '}
        <a
          href="http://google.com"
          target="_blank"
          rel="noreferrer"
          className={s.termsLink}
        >
          Terms of Use
        </a>
      </Text>
    </>
  )
}
