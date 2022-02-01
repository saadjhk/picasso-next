import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { useContext, useEffect } from "react";
import { CrowdloanRewards } from "../pallets/CrowdloanRewards";
import { PicassoApiCntxt } from "../PicassoApiContext";


const updateSlice = (account: string, cr: CrowdloanRewards, appDispatch: Dispatch<AnyAction>) => {

}

const CrowdloanRewardsUpdater = ({
  ksmAccount,
  ethAccount
}: {
  ksmAccount: string | undefined;
  ethAccount: string | undefined;
}) => {
  const { crowdloanRewards } = useContext(PicassoApiCntxt);

  useEffect(() => {
    if (ksmAccount && crowdloanRewards) {
        crowdloanRewards.association(ksmAccount);
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
