import { addCall } from "@/store/extrinsics/slice";
import { ApiPromise } from "@polkadot/api";
import { Signer } from "@polkadot/api/types";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { toHexString } from "../utils";
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
    public async associate(proof: string, rewardAccount: string, contributorAccount: string | undefined = undefined) {
        const rewardsAccountID = this.polkaApi.createType("AccountId32", rewardAccount);

        const association = !!contributorAccount
            ? {
                  RelayChain: [this.polkaApi.createType("AccountId32", contributorAccount), { Sr25519: proof }],
              }
            : { Ethereum: proof };

        return this.polkaApi.tx.crowdloanRewards.associate(rewardsAccountID, association);
    }
    /**
     * Claim Rewards
     * @param rewardsAccount SS58 format string
     */
    public async claim(rewardAccount: string, injectedSigner: Signer) {
        const rewardAccountId = this.polkaApi.createType("AccountId32", rewardAccount);    
        const methodResult = await this.polkaApi.tx.crowdloanRewards.claim().signAndSend(rewardAccountId, {
            signer: injectedSigner,
        });

        this.dispatcher(
            addCall({
                call: {
                    status: "PENDING",
                    method: this.claim.name,
                    pallet: "CrowdloanRewards",
                    parameters: [rewardAccount],
                    signer: rewardAccount,
                    hash: toHexString(methodResult.hash),
                },
            })
        );

        return methodResult.toHuman();
    }
    /**
     * Query association
     */
     public async association(userAccount: string) {
        let association: any = await this.polkaApi.query.crowdloanRewards.associations(userAccount);
        association = association.toHuman();

        return association;
    }
    /**
     * Query rewards
     */
     public async rewards(userAccount: string) {
        let rewards: any = await this.polkaApi.query.crowdloanRewards.rewards(userAccount);
        rewards = rewards.toHuman();

        return rewards;
    }
}
