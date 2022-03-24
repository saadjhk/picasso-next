import { ApiPromise } from "@polkadot/api";

export class PalletBase {
    polkaApi: ApiPromise;

    constructor(api: ApiPromise) {
        this.polkaApi = api;
    }
}