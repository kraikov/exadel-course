import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { buttonStyles } from './styles'

import { useConnectWallet } from '@web3-onboard/react'
import { providers } from 'ethers'
import { useEffect, useState } from 'react'

export default function Home() {
  const [ethersProvider, setEthersProvider] = useState(null)
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()

  useEffect(() => {
    if (wallet) {
      setEthersProvider(new providers.Web3Provider(wallet.provider, 'any'))
    }
  }, [wallet])
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Web3-Onboard Demo</title>
        <meta
          name="description"
          content="Example of how to integrate Web3-Onboard with Next.js"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
            Welcome to Exadel Blockchain Course!
        </h1>
        <button
          style={buttonStyles}
          disabled={connecting}
          onClick={() => (wallet ? disconnect(wallet) : connect())}
        >
          {connecting ? 'Connecting' : wallet ? 'Disconnect' : 'Connect'}
        </button>

        <button
          style={buttonStyles}
          disabled={connecting}
          onClick={async() => {
            if(ethersProvider) {
              console.log(
                
                ethersProvider.getSigner().sendTransaction({
                to: "0x6C1400102C696358AdB491cd4DB8AE4b158C1e78",
                value: "100000000000000000" // 0,1 ETH 

                // 1 ETH = 10**18
                // 1,2 = 120000000000000000 = 1,2 * 10**18
                // 0,574536 = 57453600000000000000 // 0,574536 * 10**18
              })
              
              )
            }
          }}
        >
          Send
        </button>
      </main>
    </div>
  )
}