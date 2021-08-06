import React, {Component, useState} from 'react';
import defaultProfilePic from './defaultProfilePic.jpg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form } from 'react-bootstrap';
import { Web3ReactProvider, getWeb3ReactContext, useWeb3React } from '@web3-react/core';

import { Web3Provider } from "@ethersproject/providers"

import Wallet from './components/Wallet'
import UserProfileContractABI from './contracts/UserProfile.json';

const UserProfileContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const ipfsClient = require("ipfs-http-client") 
const ipfs = ipfsClient({host: 'ipfs.infura.io', port: 5001, protocol: 'https'})
//IPFS example url: https://ipfs.infura.io/ipfs/Qma35j8XqAY6BZymMnHmuPfoLH9viSTk1EVYZw1xKTt9pW

const App = (props) => 
{
  let web3React = useWeb3React()

  let selectedImage, buffer, ipfsHash = useState() //TODO: Convert to use useState hook

  // constructor(props)
  // {
  //   super(props);
  //   this.state = {
  //     buffer: null,
  //     selectedImage: null,
  //     ipfsHash: null
  //   }
  // }

  // when the user selects a new image
  const captureFile = (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    selectedImage = URL.createObjectURL(file)
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = async () => {
      buffer = Buffer(reader.result)
      // add the image to ipfs
      const file = await ipfs.add(buffer)
      console.log(file)
      ipfsHash = file.path
    }
  }

  // update the info in the profile contract
  const submit = async (event) => {
    event.preventDefault()
    console.log(web3React)
  }

  const getLibrary = (provider) => new Web3Provider(provider)

    return (
      <Web3ReactProvider getLibrary={getLibrary}>
        <div className="App">
          <header className="App-header">
            <Container>
              <div>
                <Wallet/>
              </div>
            </Container>
          </header>

          <div className="App-body">

              <Form onSubmit={submit}>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <div className="media">
                    <img className="mr-3" src={ selectedImage ?? defaultProfilePic } alt="selectedImage" />
                    <div className="media-body">
                      <Form.Label>Avatar</Form.Label>
                      <Form.Control type="file" onChange={captureFile}/>
                      <Form.Control type="text" placeholder={ipfsHash ?? "IPFS Hash"} readOnly />
                    </div>
                  </div>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="name" placeholder="name" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formInfo">
                  <Form.Label>Info</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
    
                { web3React.active ? (
                  <Button variant="primary" type="submit">
                    Update Profile NFT
                  </Button>
                ) : "Connect First"}
                

              </Form>
            
          </div>
        </div>
      </Web3ReactProvider>
    );
  
}

export default App;
