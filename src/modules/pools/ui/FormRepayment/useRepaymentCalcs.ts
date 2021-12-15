import * as ethers from 'ethers'
import { useSWR } from 'modules/network/hooks/useSwr'
import { useWeb3 } from 'modules/blockChain/hooks/useWeb3'
import { useConnectorAssetERC20 } from 'modules/pools/hooks/useConnectorAssetERC20'

import type { PoolAsset } from 'modules/pools/constants/poolAssets'

const { formatEther } = ethers.utils

type Args = {
  totalDebt: number
  borrowedAsset: PoolAsset | '' | undefined
}

export function useRepaymentCalcs({ totalDebt, borrowedAsset }: Args) {
  const { walletAddress } = useWeb3()
  const connectAssetContract = useConnectorAssetERC20()

  const { data: balanceWei } = useSWR(
    borrowedAsset ? `balance-${borrowedAsset}` : null,
    async () => {
      if (!borrowedAsset || !walletAddress) return null
      const contract = connectAssetContract(borrowedAsset)
      const balance = await contract.balanceOf(walletAddress)
      return balance
    },
  )

  const balance = balanceWei && Number(formatEther(balanceWei))

  const maxAmount = balance && Math.min(totalDebt, balance)

  return {
    balance,
    maxAmount,
  }
}
