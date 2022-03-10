import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ExtrinsicsProvider } from 'substrate-react'
import { PicassoContextProvider } from '@/polkadot/PicassoApiContext'
import { store } from '@/store/store'
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PicassoContextProvider
        ss58Format={49}
        rpcUrl={
          process.env.SUBSTRATE_NODE_RPC ? process.env.SUBSTRATE_NODE_RPC : ''
        }
      >
        <ExtrinsicsProvider>
          <Component {...pageProps} />
        </ExtrinsicsProvider>
      </PicassoContextProvider>
    </Provider>
  )
}

export default MyApp
