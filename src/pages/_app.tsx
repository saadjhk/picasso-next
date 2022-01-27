import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SubstrateApiProvider } from '@/polkadot/ApiContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (<SubstrateApiProvider>
    <Component {...pageProps} />
  </SubstrateApiProvider>)
}

export default MyApp
