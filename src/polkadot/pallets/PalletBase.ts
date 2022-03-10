import { ApiPromise } from "@polkadot/api";
import { Executor } from "substrate-react/dist/Executor";

export class PalletBase {
    polkaApi: ApiPromise;
    ex: Executor;

    constructor(api: ApiPromise, ex: Executor) {
        this.polkaApi = api;
        this.ex = ex;
    }
}