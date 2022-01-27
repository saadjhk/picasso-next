import { ApiPromise } from "@polkadot/api";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";


export class CrowdloanRewards {
    polkaApi: ApiPromise;
    dispatcher: Dispatch<AnyAction>;

    constructor(api: ApiPromise, dispatch: Dispatch<AnyAction>) {
        this.dispatcher = dispatch;
        this.polkaApi = api;
    }

    public async associate (contributorsAccount: string, rewardsAccount: string) {
        const contributorAccountID = this.polkaApi.createType('AccountId32', contributorsAccount);
        const rewardsAccountID = this.polkaApi.createType('AccountId32', rewardsAccount);

        console.log(contributorAccountID)
        console.log(rewardsAccountID)
    }
}