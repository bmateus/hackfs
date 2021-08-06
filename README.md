# Learning IPFS (and ReactJS)

## Learning Resources:

### IPFS Docs
	- CIDs: https://docs.ipfs.io/concepts/content-addressing/

### Proto School
	- https://proto.school/content-addressing/02

### How to Build Ethereum Dapp With IPFS - Blockchain Programming Tutorial
	- https://www.youtube.com/watch?v=pTZVoqBUjvI
	- https://github.com/dappuniversity/meme_of_the_day
	- https://github.com/dappuniversity/starter_kit
	- https://www.npmjs.com/package/ipfs-http-client
	- https://docs.ipfs.io/concepts/ipfs-gateway/#gateway-providers
	- https://ipfs.github.io/public-gateway-checker/
	- note: ipfs-http-client api used in this video out of date

### IPFS: Browser Connectivity Walkthrough
	- https://www.youtube.com/watch?v=xZiN9dLvMoU
	- https://github.com/TheDiscordian/browser-ipfs-chat

### Connecting to web3 in a web app
	- https://docs.metamask.io/guide
	- https://reactjs.org/docs/state-and-lifecycle.html
	- https://www.npmjs.com/package/@metamask/detect-provider
	- https://github.com/web3modal/web3modal
	- https://github.com/NoahZinsmeister/web3-react/tree/v6/docs
	- https://consensys.net/blog/developers/how-to-fetch-and-update-data-from-ethereum-with-react-and-swr/

## Idea:

Simple smart contract that creates a *unique* non-transferrable NFT for a wallet address that can save profile information
- a profile image that links to an IPFS CID
- a profile name 
- additional profile info (statu, description, whatever)

User can interact with the profile smart contract from a web app that allows
	- create a profile NFT
	- uploading an image to IPFS and returns a CID
	- set other profile info
	- "save" the changes to their profile NFT

Another app that searches for a profile NFT and uses it to display the users profile:
A twitter-like messaging app:
	- displays the user's profile info
	- allows the user to post a message, saving it in ipfs, and saving the CID in a smart contract (the user's message feed)

- Both web apps will be hosted on IPFS
