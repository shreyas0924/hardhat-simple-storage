//importss
const {ethers} = require('hardhat')

//async function

const main = async () => {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log("Deploying....")
  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed();
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
