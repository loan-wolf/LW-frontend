import { useSWR } from 'modules/network/hooks/useSwr'
import { useWalletInfo } from 'modules/wallet/hooks/useWalletInfo'

import { ContractRociCreditToken } from 'modules/contracts/contracts'

export function useNfcsTokenId() {
  const { walletAddress } = useWalletInfo()
  const contract = ContractRociCreditToken.useContractWeb3()

  const tokenId = useSWR(`nfcs-mint-event-${walletAddress}`, async () => {
    const filter = contract.filters.TokenMinted(walletAddress)
    const events = await contract.queryFilter(filter)
    const event = events[0]
    if (!events[0] || !event.decode) {
      throw new Error('Event parsing error')
    }
    const decoded = event.decode(event.data, event.topics)
    return decoded._tokenId.toNumber()
  })

  return tokenId
}
