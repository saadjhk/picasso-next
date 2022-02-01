import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CrowdloanRewards } from "../pallets/CrowdloanRewards";
import { PicassoApiCntxt } from "../PicassoApiContext";


const updateSlice = async (account: string, cr: CrowdloanRewards, appDispatch: Dispatch<AnyAction>) => {
    const association = await cr.association(account);

    if (association) {
        const rewards = await cr.rewards(account);
        console.log(association)
        console.log(rewards)
    }
}

const CrowdloanRewardsUpdater = ({
  ksmAccount,
  ethAccount
}: {
  ksmAccount: string | undefined;
  ethAccount: string | undefined;
}) => {
    const appDispatch = useDispatch();
  const { crowdloanRewards } = useContext(PicassoApiCntxt);

  useEffect(() => {
    if (ksmAccount && crowdloanRewards) {
        updateSlice(ksmAccount, crowdloanRewards, appDispatch)
    }
  }, [ksmAccount, crowdloanRewards]);

  useEffect(() => {
    if (ethAccount && crowdloanRewards) {
        crowdloanRewards.association(ethAccount);
    }
  }, [ksmAccount, crowdloanRewards]);

  return null;
};

export default CrowdloanRewardsUpdater;
