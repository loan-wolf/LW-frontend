import { ContentBox } from 'shared/ui/layout/ContentBox'
import { useWalletInfo } from 'modules/wallet/hooks/useWalletInfo'
import { ethers } from 'ethers'
import { createContractHelpers } from 'modules/blockChain/utils/createContractHelpers'

async function fff(addr: any) {
  console.log(createContractHelpers)
  const body = await fetch('./TestDai.json')
  const TokenArtifact = await body.json()
  // if (addr) {
  //   let contract = new ethers.Contract(
  //     '0x57A9E5b84b9b9D096E97E959a73f0aBe8b05D75c',
  //     TokenArtifact.abi,
  //     addr,
  //   )
  // }
}

export function PageMain() {
  const { walletAddress: address } = useWalletInfo()
  fff(address)
  return <ContentBox>Main page!!!</ContentBox>
}
