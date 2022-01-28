import { ApiPromise } from "@polkadot/api";
import React, { Context, useEffect, useState } from "react";
import * as definitions from '@/interfaces/definitions';
import { CrowdloanRewards } from "./pallets/CrowdloanRewards";
import { useDispatch } from "react-redux";

export type SubstrateApiContext = {
    api: ApiPromise | undefined;
    accounts: any[];
    crowdloanRewards: CrowdloanRewards | undefined;
}

export const ApiContext: Context<SubstrateApiContext> = React.createContext<SubstrateApiContext>({
    api: undefined,
    accounts: [],
    crowdloanRewards: undefined,
})

export const SubstrateApiProvider = ({children} : { children: React.ReactNode }) => {
    const appDispatch = useDispatch();
    const [apiStore, setApiStorge] = useState<SubstrateApiContext>({
        api: undefined,
        accounts: [],
        crowdloanRewards: undefined
    })

    useEffect(() => {
        const { WsProvider } = require('@polkadot/api');

        if (process.env.SUBSTRATE_NODE_RPC) {
            const types = Object.values(definitions).reduce((res, { types }): object => ({ ...res, ...types }), {});

            const wsProvider = new WsProvider(process.env.SUBSTRATE_NODE_RPC);
            ApiPromise.create({ provider: wsProvider, types }).then(polkadotApi => {
                const { web3Enable, web3Accounts } = require("@polkadot/extension-dapp");

                web3Enable("picasso-dapp").then((injected: any) => {
                    web3Accounts().then((injectedAccounts: any) => {

                        setApiStorge({
                            api: polkadotApi,
                            accounts: injectedAccounts,
                            crowdloanRewards: new CrowdloanRewards(polkadotApi, appDispatch)
                        })
                    })
                })
            })
        }
    }, [])

    return (
        <ApiContext.Provider value={apiStore}>{children}</ApiContext.Provider>
    )
}