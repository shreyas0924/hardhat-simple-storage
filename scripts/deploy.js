//importss

const { ethers, run, network } = require("hardhat")

//async function

const main = async () => {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log("Deploying....")
  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()
  console.log(`Deployed contract to ${simpleStorage.address}`)
  console.log(network.config)

  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(6) // wait for 6 blocks then run the verification process
    await verify(simpleStorage.address , []) // empty arguments
  }
}

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
