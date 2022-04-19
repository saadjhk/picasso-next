import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CrowdloanRewards } from "../pallets/CrowdloanRewards";


const updateSlice = async (account: string, cr: CrowdloanRewards, appDispatch: Dispatch<AnyAction>) => {
    const association = await cr.association(account);

    if (association) {
      const rewards = association.RelayChain ? 
      await cr.rewards(account, true) : Promise.resolve(0)
        console.log(association)
        console.log(rewards)
    }
}

const CrowdloanRewardsUpdater = ({
  claimerAccount
}: {
  claimerAccount: string | undefined;
}) => {
    const appDispatch = useDispatch();
  // const { crowdloanRewards } = useContext(PicassoContext);

  // useEffect(() => {
  //   if (claimerAccount && crowdloanRewards) {
  //     console.log('KSM')
  //       updateSlice(claimerAccount, crowdloanRewards, appDispatch)
  //   }
  // }, [claimerAccount, crowdloanRewards]);

  return null;
};

export default CrowdloanRewardsUpdater;
