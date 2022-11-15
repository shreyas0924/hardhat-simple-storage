//importss

const { ethers, run, network } = require("hardhat")

//async function

const main = async () => {
  //Deplooy {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log("Deploying....")
  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()
  console.log(`Deployed contract to ${simpleStorage.address}`)

  //}

  //Verfiy{
  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(6) // wait for 6 blocks then run the verification process
    await verify(simpleStorage.address, []) // empty arguments
  }
  //}

  const currentValue = await simpleStorage.retrieve()
  console.log(`Current value is ${currentValue}`)

  //Update the current value
  const transactionResponse = await simpleStorage.store(7)
  await transactionResponse.wait(1)
  const updatedValue = await simpleStorage.retrieve()
  console.log(`Updated value is ${updatedValue}`)
}

//verify functioon
async function verify(contractAddrss, args) {
  //verifying contract
  console.log("Verfiying contract....")
  try {
    await run("verify:verify", {
      address: contractAddrss,
      constructorArguments: args,
    })
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified")
    } else {
      console.log(e)
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
