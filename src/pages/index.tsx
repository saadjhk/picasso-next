import CrowdloanRewardsUpdater from '@/polkadot/updaters/CrowdloanRewards';
import { crowdLoanSignableMessage } from '@/polkadot/utils';
import { stringToHex } from '@polkadot/util';
import type { NextPage } from 'next'
import { useContext, useState } from 'react';
import { PicassoContext } from '@/polkadot/PicassoApiContext';

const Home: NextPage = () => {
  const { api, accounts, crowdloanRewards } = useContext(PicassoContext);
  const [signer, setSigner] = useState("");
  const [reward, setReward] = useState("");
  const [claim, setClaim] = useState("");

  const onAssociate = async () => {
    if (api && crowdloanRewards) {
      const { web3FromAddress } = require("@polkadot/extension-dapp");
      const injector = await web3FromAddress(signer);
      const accId32 = api.createType("AccountId32", reward);
      if (injector.signer.signRaw) {
        const { signature } = await injector.signer.signRaw({
          address: signer,
          data: stringToHex(crowdLoanSignableMessage(accId32)),
          type: 'bytes'
        });
        
        const associate = await crowdloanRewards.associate(signature, reward, signer);
        const response = await associate.send();
        console.log(response.toHuman());
      }

    }
  }

  const onClaim = async () => {
    if (api && crowdloanRewards) {
      const { web3FromAddress } = require("@polkadot/extension-dapp");
      const injector = await web3FromAddress(claim);
      if (injector.signer) {
        const claimTx = await crowdloanRewards.claim(claim, injector.signer);
        console.log(claimTx)
      }
    }    
  }

  return (
    <div>
      <label>Signer</label>
      <select onChange={evt => {
        setSigner(evt.target.value)
      }}>
        {accounts.map((acc: any, index: number) => {
          return (<option key={index} value={acc.address}>{acc.meta.name}</option>)
        })}
      </select><br></br>
      <label>Reward</label>
      <select onChange={evt => {
        setReward(evt.target.value)
      }}>
        {accounts.map((acc: any, index: number) => {
          return (<option key={index} value={acc.address}>{acc.meta.name}</option>)
        })}
      </select><br></br>
      <button onClick={evt => {
        evt.preventDefault();
        onAssociate();
      }}>Associate</button><br></br>
      <label>Claim</label>
      <select onChange={evt => {
        setClaim(evt.target.value)
      }}>
        {accounts.map((acc: any, index: number) => {
          return (<option key={index} value={acc.address}>{acc.meta.name}</option>)
        })}
      </select><br></br>
      <button onClick={onClaim}>Claim</button>
      <CrowdloanRewardsUpdater claimerAccount={signer} />
    </div>
  )
}

export default Home
