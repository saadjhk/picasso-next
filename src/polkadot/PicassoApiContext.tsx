import { ApiPromise } from "@polkadot/api";
import React, { useEffect, useState } from "react";
import * as definitions from "@/interfaces/definitions";
import type { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { CrowdloanRewards } from "./pallets/CrowdloanRewards";

type ApiConnectionStatus = "initializing" | "connected" | "failed" | "error";
type PolkadotExtensionStatus = "initializing" | "error" | "no_extension";

export const PicassoContext = React.createContext({
  api: undefined as ApiPromise | undefined,
  apiConnectionStatus: "initializing" as ApiConnectionStatus,
  accounts: [] as InjectedAccountWithMeta[],
  crowdloanRewards: undefined as CrowdloanRewards | undefined,
  extensionStatus: "initializing" as PolkadotExtensionStatus
});

export const PicassoContextProvider = ({
  children,
  rpcUrl,
  ss58Format,
}: {
  children: React.ReactNode;
  rpcUrl: string;
  ss58Format: number;
}) => {

  const [picassoApiState, setPicassoApiState] = useState({
    api: undefined as ApiPromise | undefined,
    apiConnectionStatus: "initializing" as ApiConnectionStatus,
    accounts: [] as InjectedAccountWithMeta[],
    crowdloanRewards: undefined as CrowdloanRewards | undefined,
    extensionStatus: "initializing" as PolkadotExtensionStatus
  });

  useEffect(() => {
    const { WsProvider } = require("@polkadot/api");

    const types = Object.values(definitions).reduce(
      (res, { types }): object => ({ ...res, ...types }),
      {}
    );

    const wsProvider = new WsProvider(rpcUrl);
    ApiPromise.create({ provider: wsProvider, types }).then((polkadotApi) => {
      setPicassoApiState((s) => {
        s.api = polkadotApi;
        return s;
      });
    });
  }, []);

  return (
    <PicassoContext.Provider value={picassoApiState}>
      {children}
    </PicassoContext.Provider>
  );
};
