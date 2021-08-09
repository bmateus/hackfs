# HackFS: Learning IPFS (and ReactJS)

This is a project for EthGlobal HackFS 2021 that I put together to learn about IPFS, ReactJS and the process of creating and deploying a smart contract and Dapp. The idea is:

Create a simple smart contract that can save profile information for a target wallet address. The profile info would include:
- a profile image that links to an IPFS CID
- a profile name 
- additional profile info (status, description, whatever)

Users can interact with the profile smart contract from a dapp that allows:
	- creating a profile
	- uploading an image to IPFS and returning a CID
	- setting other profile info
	- saving the changes to the blockchain

Additionally, I'd like to create another app that utilizes a wallet's on-chain profile info like a simple twitter-like messaging app that:
	- displays the user's profile info
	- allows the user to post a message, saving it in ipfs, and saving the CID in a smart contract (the user's message feed)

- Both web apps will be hosted on IPFS

- The project is deployed on Polygon:

Profile Contract Address:
0x8506a43ecf67C14817FbC935b218339d5c90f5b6
https://polygonscan.com/address/0x8506a43ecf67c14817fbc935b218339d5c90f5b6

Profile Dapp:
https://divine-bread-9247.on.fleek.co/


