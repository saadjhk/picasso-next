import { useContext, useEffect, useState } from "react";
import { PicassoApiCntxt } from "../PicassoApiContext";

const CrowdloanRewardsUpdater = ( { ksmAccount,  } : { ksmAccount: string | undefined; ethAccount: string | undefined } ) => {
    const { crowdloanRewards } = useContext(PicassoApiCntxt);

    useEffect(() => {
        if (ksmAccount && crowdloanRewards) {
        }
    }, [ksmAccount, crowdloanRewards]);

    return null;
}

export default CrowdloanRewardsUpdater;