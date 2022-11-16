const { ethers } = require("hardhat")

describe("SimpleStorage", function () {
  let simpleStorage, simpleStorageFactory
  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    simpleStorage = await simpleStorageFactory.deploy()
  })

  it()
})
