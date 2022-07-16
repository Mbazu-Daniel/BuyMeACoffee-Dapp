const {ethers} = require("hardhat")

async function main() {
 
  const BuyMeACoffee = await ethers.getContractFactory("BuyMeACoffee");
  const buyMeACoffee = await BuyMeACoffee.deploy();

  await buyMeACoffee.deployed();

  console.log("BuyMeACoffee Contract: Address", buyMeACoffee.address);

  console.log(`https://HelloWorld.com/${buyMeACoffee.address}`)
}



main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
