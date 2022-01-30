import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

export type Extrinsic = {
    status: "PENDING" | "SUCCESS";
    method: string;
    pallet: string;
    parameters: any[];
    signer: string;
    hash: string;
}

export type ExtrinsicStore = {
    [accountId: string]: {
      [txID: string]: Extrinsic
    };
}

const initialState: ExtrinsicStore = {}

export const extrinsicsSlice = createSlice({
  name: 'extrinsics',
  initialState,
  reducers: {
    addCall: (state, action: PayloadAction<{ call: Extrinsic }>) => {
        const { call } = action.payload;
        if (!state[call.signer]) {
          state[call.signer] = {};
        }
        state[call.signer][call.hash] = call;
    },
  },
})

export const selectExtrinsics = (state: RootState) => state.extrinsics;

export const { addCall } = extrinsicsSlice.actions
export default extrinsicsSlice.reducer