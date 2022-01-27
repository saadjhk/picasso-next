import { ApiPromise } from "@polkadot/api";
import React, { Context, useEffect, useState } from "react";

export type SubstrateApiContext = {
    api: ApiPromise | undefined;
}

const _ApiContext: Context<SubstrateApiContext> = React.createContext<SubstrateApiContext>({
    api: undefined
})

export const SubstrateApiProvider = ({children} : { children: React.ReactNode }) => {
    const [api, setApi] = useState<ApiPromise | undefined>(undefined);

    useEffect(() => {
        const { WsProvider } = require('@polkadot/api');

        if (process.env.SUBSTRATE_NODE_RPC) {
            const wsProvider = new WsProvider(process.env.SUBSTRATE_NODE_RPC);
            ApiPromise.create({ provider: wsProvider }).then(polkadotApi => {
                setApi(polkadotApi);
            })
        }
    }, [])

    return (
        <_ApiContext.Provider value={{api}}>{children}</_ApiContext.Provider>
    )
}