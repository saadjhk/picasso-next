import { ApiPromise } from "@polkadot/api";
import React, { Context, useEffect, useState } from "react";
import * as definitions from '@/interfaces/definitions';

export type SubstrateApiContext = {
    api: ApiPromise | undefined;
    accounts: any[]
}

const _ApiContext: Context<SubstrateApiContext> = React.createContext<SubstrateApiContext>({
    api: undefined,
    accounts: []
})

export const SubstrateApiProvider = ({children} : { children: React.ReactNode }) => {
    const [api, setApi] = useState<ApiPromise | undefined>(undefined);
    const [accounts, setAccounts] = useState<any[]>([]);

    useEffect(() => {
        const { WsProvider } = require('@polkadot/api');

        if (process.env.SUBSTRATE_NODE_RPC) {
            const types = Object.values(definitions).reduce((res, { types }): object => ({ ...res, ...types }), {});

            const wsProvider = new WsProvider(process.env.SUBSTRATE_NODE_RPC);
            ApiPromise.create({ provider: wsProvider, types }).then(polkadotApi => {
                setApi(polkadotApi);

                const { web3Enable, web3Accounts } = require("@polkadot/extension-dapp");

                web3Enable("picasso-dapp").then((injected: any) => {
                    web3Accounts().then((injectedAccounts: any) => {
                        setAccounts(injectedAccounts)
                    })
                })
            })
        }
    }, [])

    return (
        <_ApiContext.Provider value={{api,accounts}}>{children}</_ApiContext.Provider>
    )
}