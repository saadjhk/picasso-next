import { ApiPromise } from "@polkadot/api";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";

export class PalletBase {
    polkaApi: ApiPromise;
    dispatcher: Dispatch<AnyAction>;

    constructor(api: ApiPromise, dispatch: Dispatch<AnyAction>) {
        this.dispatcher = dispatch;
        this.polkaApi = api;
    }
}