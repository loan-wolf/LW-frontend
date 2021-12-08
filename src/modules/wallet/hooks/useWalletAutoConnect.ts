import { useEffect, useRef } from 'react'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'
import { useWalletConnectorStorage } from './useWalletConnectorStorage'
import { useWalletConnectors } from './useWalletConnectors'

export function useWalletAutoConnect() {
  const { active, connector: currentConnector, activate: connect } = useWeb3()
  const connectors = useWalletConnectors()
  const [connectorName, setConnector] = useWalletConnectorStorage()

  useEffect(() => {
    if (!active) {
      setConnector(null)
      return
    }

    const [name] =
      Object.entries(connectors).find(
        ([, connectorObj]) => connectorObj === currentConnector,
      ) ?? []

    if (name) {
      setConnector(name as keyof typeof connectors)
    }
  }, [active, connectors, currentConnector, setConnector])

  const mounted = useRef(false)

  useEffect(() => {
    if (mounted.current) return
    mounted.current = true

    const savedConnector = connectorName && connectors[connectorName]
    if (!savedConnector || active) return
    connect(savedConnector)
  }, [connect, connectors, active, connectorName])
}
