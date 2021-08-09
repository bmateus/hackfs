import { useState, useEffect } from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { Button } from 'react-bootstrap';
import { InjectedConnector } from '@web3-react/injected-connector';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
	NoEthereumProviderError,
	UserRejectedRequestError
  } from '@web3-react/injected-connector'

const injectedConnector = new InjectedConnector({ supportedChainIds: [137, 1337] })

function getErrorMessage(error) {
	if (error instanceof NoEthereumProviderError) {
		return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
	} else if (error instanceof UnsupportedChainIdError) {
		return "You're connected to an unsupported network."
	} else if (error instanceof UserRejectedRequestError) {
		return 'Please authorize this website to access your Ethereum account.'
	} else {
		console.error(error)
		return 'An unknown error occurred. Check the console for more details.'
	}
}

const Wallet = () => {

	const web3React = useWeb3React()
	const {connector} = web3React
	const [activatingConnector, setActivatingConnector] = useState(connector)

	useEffect(() => {
		if (activatingConnector && activatingConnector === connector) {
		  setActivatingConnector(undefined)
		}
	  }, [activatingConnector, connector])


    const onClick = () => {
		setActivatingConnector(injectedConnector)
		web3React.activate(injectedConnector)
    }
  
    return (		
		<div className="row">
			<div className="col-sm-2"/>
			<div className="col-sm-8">
				{web3React.error && getErrorMessage(web3React.error)}
				{activatingConnector && "Waiting for Permission"}
				{web3React.active && web3React.account }
			</div>
			<div className="col-sm-2">
			{!activatingConnector && !web3React.active && (
				<Button onClick={onClick}>
				Connect
				</Button>
			)}
			</div>
		</div>
		
    )
  }

  export default Wallet