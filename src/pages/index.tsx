import CrowdloanRewardsUpdater from '@/polkadot/updaters/CrowdloanRewards'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useDotSamaContext, useParachainApi } from 'substrate-react'
import { ConntectedAccount } from 'substrate-react/dist/dotsama/types'

const Home: NextPage = () => {
  const { activate } = useDotSamaContext();
  const { accounts } = useParachainApi('picasso');
  const [signer, setSigner] = useState('')
  const [reward, setReward] = useState('')
  const [claim, setClaim] = useState('')

  useEffect(() => {
    if (activate) {
      activate();
    }
  }, [activate]);

  // const onAssociate = async () => {
  //   if (api && crowdloanRewards) {
  //     const {
  //       web3FromAddress,
  //       web3Enable,
  //     } = require('@polkadot/extension-dapp')
  //     await web3Enable(APP_NAME)
  //     const injector = await web3FromAddress(signer)
  //     const accId32 = api.createType('AccountId32', reward)
  //     if (injector.signer.signRaw) {
  //       const { signature } = await injector.signer.signRaw({
  //         address: signer,
  //         data: stringToHex(crowdLoanSignableMessage(accId32)),
  //         type: 'bytes',
  //       })

  //       const associate = await crowdloanRewards.associate(
  //         signature,
  //         reward,
  //         signer,
  //       )
  //       const response = await associate.send()
  //       console.log(response.toHuman())
  //     }
  //   }
  // }

  // const onClaim = async () => {
  //   if (api && crowdloanRewards) {
  //     const {
  //       web3FromAddress,
  //       web3Enable,
  //     } = require('@polkadot/extension-dapp')
  //     await web3Enable(APP_NAME)
  //     const injector = await web3FromAddress(claim)

  //     if (injector.signer && txExecutor) {
  //       crowdloanRewards.claimExecute(claim, injector.signer, txExecutor)
  //     }
  //   }
  // }

  return (
    <div>
      <label>Signer</label>
      <select
        onChange={(evt) => {
          setSigner(evt.target.value);
        }}
      >
        {accounts.map((acc: any, index: number) => {
          return (
            <option key={index} value={acc.address}>
              {acc.name}
            </option>
          );
        })}
      </select>
      <br></br>
      <label>Reward</label>
      <select
        onChange={(evt) => {
          setReward(evt.target.value);
        }}
      >
        {accounts.map((acc: any, index: number) => {
          return (
            <option key={index} value={acc.address}>
              {acc.name}
            </option>
          );
        })}
      </select>
      <br></br>
      <button
        onClick={(evt) => {
          evt.preventDefault()
          // onAssociate()
        }}
      >
        Associate
      </button>
      <br></br>
      <label>Claim</label>
      <select
        onChange={(evt) => {
          setClaim(evt.target.value);
        }}
      >
        {accounts.map((acc: ConntectedAccount, index: number) => {
          return (
            <option key={index} value={acc.address}>
              {acc.name}
            </option>
          );
        })}
      </select>
      <br></br>
      <button>Claim</button>
      
      <br></br>
      <br></br>

      <label>From</label>
      <select
        onChange={(evt) => {
          setClaim(evt.target.value)
        }}
      >
        {accounts.map((acc: ConntectedAccount, index: number) => {
          return (
            <option key={index} value={acc.address}>
              {acc.name}
            </option>
          )
        })}
      </select>


      <label>To</label>
      <select
        onChange={(evt) => {
          setClaim(evt.target.value)
        }}
      >
        {accounts.map((acc: ConntectedAccount, index: number) => {
          return (
            <option key={index} value={acc.address}>
              {acc.name}
            </option>
          )
        })}
      </select>

      <input type="text" />

      <button>Transfer</button>


      <CrowdloanRewardsUpdater claimerAccount={signer} />
    </div>
  );
};

export default Home;
