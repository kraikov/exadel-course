import '../styles/globals.css'
import Onboard from '@web3-onboard/core'
import { Web3OnboardProvider } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import coinbaseWalletModule from '@web3-onboard/coinbase'
import walletConnectModule from '@web3-onboard/walletconnect'

const ethereumGoerli = {
  id: '0x5',
  token: 'gETH',
  label: 'Ethereum Goerli',
  rpcUrl: `https://eth-goerli.public.blastapi.io`
}

const polygonMainnet = {
  id: '0x89',
  token: 'MATIC',
  label: 'Polygon',
  rpcUrl: 'https://matic-mainnet.chainstacklabs.com'
}
const coinbaseWalletSdk = coinbaseWalletModule({ darkMode: true })

const walletConnect = walletConnectModule({
  bridge: 'YOUR_CUSTOM_BRIDGE_SERVER',
  qrcodeModalOptions: {
    mobileLinks: ['rainbow', 'metamask', 'argent', 'trust', 'imtoken', 'pillar']
  },
  connectFirstChainId: true
})

const chains = [polygonMainnet, ethereumGoerli]
const wallets = [injectedModule(), coinbaseWalletSdk, walletConnect]

const web3Onboard = Onboard({
  wallets,
  chains,
  appMetadata: {
    name: "Web3-Onboard Demo",
    icon: '<svg>My App Icon</svg>',
    description: "A demo of Web3-Onboard.",
    recommendedInjectedWallets: [
      {name: "Coinbase", url: 'https://wallet.coinbase.com'},
      {name: "Metamask", url: 'https://wallet.coinbase.com'},
    ]
  },
  
})

function MyApp({ Component, pageProps }) {
  return (
    <Web3OnboardProvider web3Onboard={web3Onboard}>
      <Component {...pageProps} />
    </Web3OnboardProvider>
  )
}

export default MyApp