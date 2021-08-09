import { useEffect, useState } from 'react';
import { useWeb3React } from '@web3-react/core';
import { Button, Form } from 'react-bootstrap';
import { Contract } from 'ethers'
import defaultProfilePic from '../../images/defaultProfilePic.jpg';
import UserProfileContract from '../../contracts/UserProfile.json';
const UserProfileContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";


const ProfileView = () => {

    const web3React = useWeb3React()
	const { account, connector, library } = web3React

	const [hasValidProfile, setHasValidProfile] = useState(false)
	const [isEditing, setIsEditing] = useState(false)
	const [updatedImage, setUpdatedImage] = useState()
	const [profileName, setProfileName] = useState("")
	const [profileInfo, setProfileInfo] = useState("")
	const [ipfsHash, setIpfsHash] = useState("")
	const [contract, setContract] = useState()

	const ipfsClient = require("ipfs-http-client") 
	const ipfs = ipfsClient({host: 'ipfs.infura.io', port: 5001, protocol: 'https'})
	//IPFS example url: https://ipfs.infura.io/ipfs/Qma35j8XqAY6BZymMnHmuPfoLH9viSTk1EVYZw1xKTt9pW


	// grab info from the contract when wallet connector changes
	useEffect(() => {

		console.log("Connector changed?")
		console.log(library)
		if (!!library)
		{
			async function fetchData()
			{
				const data = await contract.get(account)
				console.log(data)

				setIpfsHash(data.avatar)
				setProfileName(data.name)
				setProfileInfo(data.info)

				
				if (data.avatar === "")
				{
					setUpdatedImage(defaultProfilePic)
				}
				else
				{
					setUpdatedImage(`https://ipfs.infura.io/ipfs/${data.avatar}`)
				}

				const invalidProfile = (data.avatar === "" && data.name === "" && data.info === "")
				setHasValidProfile(!invalidProfile)
				setIsEditing(invalidProfile)

			}
			if (!contract)
			{
				setContract(new Contract(UserProfileContractAddress, UserProfileContract.abi, library.getSigner()))
			}
			else
			{
				fetchData()
			}
		}
	}, [account, connector, library, contract])

	// when the user selects a new image
	const captureFile = (event) => {
		event.preventDefault()
		const file = event.target.files[0]
		if (file.type.match('image.*')) {
			setUpdatedImage(URL.createObjectURL(file))
			const reader = new window.FileReader()
			reader.readAsArrayBuffer(file)
			reader.onloadend = async () => {
				const buffer = Buffer(reader.result)
				// add the image to ipfs
				const file = await ipfs.add(buffer)
				setIpfsHash(file.path)
			}
		}
		else
		{
			event.target.reset()
		}
	}

	// update the info in the profile contract
	const submit = async (event) => {
		event.preventDefault()
		console.log(web3React)
		console.log("updating...")
		await contract.update(ipfsHash, profileName, profileInfo)		
		console.log("done!")
		setIsEditing(false)
	}

	const handleProfileNameChanged = event => {
		setProfileName(event.target.value)
	}

	const handleProfileInfoChanged = event => {
		setProfileInfo(event.target.value)
	}


	return (
		<div>			
		{ isEditing ? 
		(
			<Form onSubmit={submit}>
				<Form.Group className="mb-3" controlId="formBasicEmail">
					<div className="media">
					<img className="mr-3" src={ updatedImage ?? defaultProfilePic } alt="selectedImage" />
					<div className="media-body">
						<Form.Label>Avatar</Form.Label>
						<Form.Control type="file" onChange={captureFile}/>
					</div>
					</div>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formName">
					<Form.Label>Name</Form.Label>
					<Form.Control type="name" placeholder="Enter Name" 
						onChange={handleProfileNameChanged} value={profileName}/>
				</Form.Group>

				<Form.Group className="mb-3" controlId="formInfo">
					<Form.Label>Info</Form.Label>
					<Form.Control as="textarea" rows={3} placeholder={profileInfo} 
						onChange={handleProfileInfoChanged} value={profileInfo}/>
				</Form.Group>

				{ web3React.active ? (
					<div>
						<Button variant="primary" type="submit">
							{hasValidProfile ? "Update" : "Create"} Profile
						</Button>
						{hasValidProfile && <Button onClick={() => setIsEditing(false)}>Cancel</Button>}
					</div>
				) : "Connect Wallet to update profile"}
			</Form>
		) :
		(
			<div>
				<img className="mr-3" src={ updatedImage ?? defaultProfilePic } alt="selectedImage" />
				<div><h1>{profileName}</h1></div>
				<div>{profileInfo}</div>
				{ web3React.active ? (
				<Button onClick={() => setIsEditing(true)}>
					Edit Profile
				</Button>
				): "Connect Wallet to update profile"}
			</div>
		)}
		</div>
	)
}

export default ProfileView