import { ApiPromise } from "@polkadot/api";
import { Signer } from "@polkadot/api/types";
import { stringToU8a } from "@polkadot/util";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { PalletBase } from "./PalletBase";


export class CrowdloanRewards extends PalletBase {
    constructor(api: ApiPromise, dispatch: Dispatch<AnyAction>) {
        super(api, dispatch);
    }
    /**
     * Send association to picasso chain
     * @param proof Signed hash by contributor
     * @param rewardsAccount SS58 format string
     * @param contributorsAccount SS58 format string
     */
    public async associate (proof: string, rewardAccount: string, contributorAccount: string | undefined = undefined) {
        const rewardsAccountID = this.polkaApi.createType('AccountId32', rewardAccount);

        const association = !!contributorAccount ? {
            RelayChain: [this.polkaApi.createType("AccountId32", contributorAccount), { Sr25519: proof }]
        } : { Ethereum: proof }

        return this.polkaApi.tx.crowdloanRewards.associate(rewardsAccountID, association);
    }
    /**
     * Claim Rewards
     * @param rewardsAccount SS58 format string
     */
     public async claim (rewardAccount: string, injectedSigner: Signer) {
        const rewardAccountId = this.polkaApi.createType("AccountId32", rewardAccount);
        return this.polkaApi.tx.crowdloanRewards.claim().signAndSend(rewardAccountId, {
            signer: injectedSigner
        })
    }
}