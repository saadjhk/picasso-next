import { ApiContext } from '@/polkadot/ApiContext'
import { CrowdloanRewards } from '@/polkadot/CrowdloanRewards';
import type { NextPage } from 'next'
import { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

const Home: NextPage = () => {
  const { api, accounts } = useContext(ApiContext);
  const appDispatch = useDispatch();

  const [cr, setCr] = useState<CrowdloanRewards | undefined>(undefined);

  useEffect(() => {
    if (api) {
      setCr(new CrowdloanRewards(api, appDispatch))
    }
  }, [api]);


  useEffect(() => {
    if (cr && accounts.length) {
      cr.associate(accounts[0].address, accounts[1].address)
    }
  }, [cr,accounts]);

  return (
    <div>
      Hello
    </div>
  )
}

export default Home
