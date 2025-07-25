// lib/chains.ts

import { Chain } from 'wagmi'
import { 
  mainnet, 
  polygon, 
  arbitrum, 
  base 
} from 'viem/chains'

export const supportedChains: Chain[] = [
  {
    ...mainnet,
    iconUrl: 'https://raw.githubusercontent.com/wagmi-dev/wagmi/main/packages/assets/chains/1.svg',
  },
  {
    ...polygon,
    iconUrl: 'https://raw.githubusercontent.com/wagmi-dev/wagmi/main/packages/assets/chains/137.svg',
  },
  {
    ...arbitrum,
    iconUrl: 'https://raw.githubusercontent.com/wagmi-dev/wagmi/main/packages/assets/chains/42161.svg',
  },
  {
    ...base,
    iconUrl: 'https://raw.githubusercontent.com/wagmi-dev/wagmi/main/packages/assets/chains/8453.svg',
  },
]
