// const hre = require('hardhat');
const { ethers } = require("hardhat");

// Returns the ehter balance of a given address
async function getBalance(address) {
  const balanceBigInt = await ethers.provider.getBalance(address);
  return ethers.utils.formatEther(balanceBigInt);
}

// Logs the Ether balances for a list of Addresses
async function printBalances(addresses) {
  let idx = 0;
  for (const address of addresses) {
    console.log(`Address ${idx} balances: `, await getBalance(address));
    idx++;
  }
}

// Logs the memos stored on-chain from coffee purchases
async function printMemos(memos) {
  for (const memo of memos) {
    const timestamp = memo.timestamp;
    const tipper = memo.name;
    const tipperAddress = memo.from;
    const message = memo.message;
    console.log(
      `At ${timestamp}, ${tipper} (${tipperAddress}) said: ${message}`
    );
  }
}

async function main() {
  const [owner, tipper, tipper2, tipper3] = await ethers.getSigners();

  // Get the contract to deploy and deploy the contract
  const BuyMeACoffee = await ethers.getContractFactory("BuyMeACoffee");
  const buyMeACoffee = await BuyMeACoffee.deploy();
  await buyMeACoffee.deployed();
  console.log("BuyMeACoffee Contract Address ", buyMeACoffee.address);

  // Check balances before the coffee purchase
  console.log("-----------Starting-----------");
  const addresses = [owner.address, tipper.address, buyMeACoffee.address];
  console.log("-----------Balances before coffe purchase-----------");
  await printBalances(addresses);

//   Buy the owner a few coffees
    const tip = {value: ethers.utils.parseEther("1")}
   await buyMeACoffee.connect(tipper).buyCoffee("Daniel", "You're are doing great", tip)
   await  buyMeACoffee.connect(tipper2).buyCoffee("Kelechi", "Amazing learner", tip)
   await buyMeACoffee.connect(tipper3).buyCoffee("Chibuzor", "Keep doing your BEST boy", tip)


//    check balances after the coffee purchase
console.log("-----------Balance after coffe purchase-----------");
await printBalances(addresses)


// Withdraw funds
console.log("-----------Withdraw tips-----------");
await buyMeACoffee.connect(owner).withdrawTips();

console.log("-----------Balance after withrawing tips-----------");
await printBalances(addresses)

// Read all the memos left for the owner
console.log("-----------Retrieving Memos -----------");
const memos = await buyMeACoffee.getMemos()
printMemos(memos)

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
