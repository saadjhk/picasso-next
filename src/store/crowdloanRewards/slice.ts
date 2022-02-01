import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type CrowdloanRewardSlice = {
  associationChain: "ETHEREUM" | "RELAY" | null;
  associationAccount: string;
  claimable: string;
  totalVested: string;
};

const initialState: CrowdloanRewardSlice = {
  associationChain: null,
  associationAccount: "",
  claimable: "0",
  totalVested: "0",
};

export const crowdloanRewardSlice = createSlice({
  name: "crowdloanRewards",
  initialState,
  reducers: {
    updateCrowdloanRewards: (
      state,
      action: PayloadAction<{ rewards: CrowdloanRewardSlice }>
    ) => {
      const { rewards } = action.payload;
      state = rewards;
    },
  },
});

export const selectExtrinsics = (state: RootState) => state.extrinsics;

export const { updateCrowdloanRewards } = crowdloanRewardSlice.actions;
export default crowdloanRewardSlice.reducer;
