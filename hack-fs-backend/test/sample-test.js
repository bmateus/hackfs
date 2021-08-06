const { expect } = require("chai");
const { defaultAccounts } = require("ethereum-waffle");

describe("UserProfile", function () {
  it("Should return a user profile", async function () {

    const UserProfile = await ethers.getContractFactory("UserProfile");
    const profile = await UserProfile.deploy();
    await profile.deployed();

    const [owner] = await ethers.getSigners();

    console.log(await profile.get(owner.address));

    await profile.update("654321", "Tony", "I like turtles");

    console.log(await profile.get(owner.address));

    await profile.destroy();

    console.log(await profile.get(owner.address));

  });
});
