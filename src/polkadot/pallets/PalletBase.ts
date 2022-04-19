import { ApiPromise } from "@polkadot/api";
import Executor from "substrate-react/dist/extrinsics/Executor";

export class PalletBase {
    polkaApi: ApiPromise;

    constructor(api: ApiPromise) {
        this.polkaApi = api;
    }
}