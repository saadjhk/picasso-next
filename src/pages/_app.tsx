import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SubstrateApiProvider } from "@/polkadot/PicassoApiContext";
import { store } from "@/store/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <SubstrateApiProvider>
        <Component {...pageProps} />
      </SubstrateApiProvider>
    </Provider>
  );
}

export default MyApp;
