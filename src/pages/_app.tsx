import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ExtrinsicsProvider } from 'substrate-react'
import { PicassoContextProvider } from '@/polkadot/PicassoApiContext'
import { store } from '@/store/store'
import { Provider } from 'react-redux'
import { APP_NAME } from '@/polkadot/constants'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ExtrinsicsProvider>
        <PicassoContextProvider
          appName={APP_NAME}
          ss58Format={49}
          rpcUrl={
            process.env.SUBSTRATE_NODE_RPC ? process.env.SUBSTRATE_NODE_RPC : ''
          }
        >
          <Component {...pageProps} />
        </PicassoContextProvider>
      </ExtrinsicsProvider>
    </Provider>
  )
}

export default MyApp
