import CrowdloanRewardsUpdater from '@/polkadot/updaters/CrowdloanRewards'
import { crowdLoanSignableMessage } from '@/polkadot/utils'
import { stringToHex } from '@polkadot/util'
import type { NextPage } from 'next'
import { useContext, useEffect, useState } from 'react'
import { PicassoContext } from '@/polkadot/PicassoApiContext'
import { useExtrinsics } from 'substrate-react'
import { APP_NAME } from '@/polkadot/constants'

const Home: NextPage = () => {
  const { api, accounts, crowdloanRewards } = useContext(PicassoContext)
  const { extrinsics, txExecutor } = useExtrinsics()
  const [signer, setSigner] = useState('')
  const [reward, setReward] = useState('')
  const [claim, setClaim] = useState('')

  const onAssociate = async () => {
    if (api && crowdloanRewards) {
      const {
        web3FromAddress,
        web3Enable,
      } = require('@polkadot/extension-dapp')
      await web3Enable(APP_NAME)
      const injector = await web3FromAddress(signer)
      const accId32 = api.createType('AccountId32', reward)
      if (injector.signer.signRaw) {
        const { signature } = await injector.signer.signRaw({
          address: signer,
          data: stringToHex(crowdLoanSignableMessage(accId32)),
          type: 'bytes',
        })

        const associate = await crowdloanRewards.associate(
          signature,
          reward,
          signer,
        )
        const response = await associate.send()
        console.log(response.toHuman())
      }
    }
  }

  const onClaim = async () => {
    if (api && crowdloanRewards) {
      const {
        web3FromAddress,
        web3Enable,
      } = require('@polkadot/extension-dapp')
      await web3Enable(APP_NAME)
      const injector = await web3FromAddress(claim)

      if (injector.signer && txExecutor) {
        crowdloanRewards.claimExecute(claim, injector.signer, txExecutor)
      }
    }
  }

  useEffect(() => {
    console.log(extrinsics)
  }, [extrinsics])

  return (
    <div>
      <label>Signer</label>
      <select
        onChange={(evt) => {
          setSigner(evt.target.value)
        }}
      >
        {accounts.map((acc: any, index: number) => {
          return (
            <option key={index} value={acc.address}>
              {acc.meta.name}
            </option>
          )
        })}
      </select>
      <br></br>
      <label>Reward</label>
      <select
        onChange={(evt) => {
          setReward(evt.target.value)
        }}
      >
        {accounts.map((acc: any, index: number) => {
          return (
            <option key={index} value={acc.address}>
              {acc.meta.name}
            </option>
          )
        })}
      </select>
      <br></br>
      <button
        onClick={(evt) => {
          evt.preventDefault()
          onAssociate()
        }}
      >
        Associate
      </button>
      <br></br>
      <label>Claim</label>
      <select
        onChange={(evt) => {
          setClaim(evt.target.value)
        }}
      >
        {accounts.map((acc: any, index: number) => {
          return (
            <option key={index} value={acc.address}>
              {acc.meta.name}
            </option>
          )
        })}
      </select>
      <br></br>
      <button onClick={onClaim}>Claim</button>
      <CrowdloanRewardsUpdater claimerAccount={signer} />
    </div>
  )
}

export default Home
