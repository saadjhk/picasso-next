import { ApiContext } from '@/polkadot/ApiContext'
import { crowdLoanSignableMessage } from '@/polkadot/utils';
import { stringToHex } from '@polkadot/util';
import type { NextPage } from 'next'
import { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

const Home: NextPage = () => {
  const { api, accounts, crowdloanRewards } = useContext(ApiContext);
  const [signer, setSigner] = useState("");
  const [reward, setReward] = useState("");

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
      }}>Associate</button>
    </div>
  )
}

export default Home
