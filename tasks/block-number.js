const { task } = require("hardhat/config")

task("blcok-number", "Prints the current block number").setAction(
  async (taskargs, hre) => {
    // hre is hardhat runtime environment
    const blockNumber = await hre.ethers.provider.getBlockNumber()
    console.log(`Current block number is ${blockNumber}`)
  }
)

module.exports = {}
