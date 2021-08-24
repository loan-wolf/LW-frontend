import { useLocalStorage } from 'shared/hooks/useLocalStorage'
import { LS_PREFIX } from 'config'
import type { WalletConnectorsValue } from '../providers/walletConnectorsProvider'

const LS_KEY_CONNECTOR = `${LS_PREFIX}-connector`

type Connector = keyof WalletConnectorsValue

export function useWalletConnectorStorage() {
  return useLocalStorage<Connector | null>(LS_KEY_CONNECTOR, null)
}
