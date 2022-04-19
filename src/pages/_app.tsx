import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ExecutorProvider, DotSamaContextProvider } from 'substrate-react'
import { APP_NAME } from '@/polkadot/constants'
import { store } from '@/store/store'
import { Provider } from 'react-redux'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <DotSamaContextProvider 
        appName={APP_NAME}
        supportedParachains={[
          {
            chainId: "picasso",
            rpcUrl: "ws://127.0.0.1:9988"
          }
        ]}>
          <ExecutorProvider>
            <Component {...pageProps} />
          </ExecutorProvider>
      </DotSamaContextProvider>
    </Provider>
  )
}

export default MyApp
