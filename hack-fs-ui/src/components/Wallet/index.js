import { useWeb3React } from '@web3-react/core'
import { Button } from 'react-bootstrap';
import { InjectedConnector } from '@web3-react/injected-connector';

const injectedConnector = new InjectedConnector({ supportedChainIds: [137] })

const Wallet = () => {

    const web3React = useWeb3React()

	// interface Web3ReactContextInterface<T = any> {
	// 	activate: (
	// 	  connector: AbstractConnectorInterface,
	// 	  onError?: (error: Error) => void,
	// 	  throwErrors?: boolean
	// 	) => Promise<void>
	// 	setError: (error: Error) => void
	// 	deactivate: () => void
	  
	// 	connector?: AbstractConnectorInterface
	// 	library?: T
	// 	chainId?: number
	// 	account?: null | string
	  
	// 	active: boolean
	// 	error?: Error
	//   }

  
    const onClick = () => {
      web3React.activate(injectedConnector)
    }
  
    return (
	  web3React.error ? web3React.error.message : (
      <div>        
        {web3React.active ? (
        	<div>Account: {web3React.account}</div>  
        ) : (
          <Button type="button" onClick={onClick}>
            Connect
          </Button>
        )}
      </div>
		)
    )
  }

  export default Wallet