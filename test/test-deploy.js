const { assert } = require("chai")
const { ethers } = require("hardhat")

describe("SimpleStorage", function () {
  let simpleStorage, simpleStorageFactory
  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    simpleStorage = await simpleStorageFactory.deploy()
  })

  it("Should start with favourite number 0", async function () {
    const currentValue = await simpleStorage.retrieve()
    const expectedValue = "0"
    assert.equal(currentValue.toString(), expectedValue)
  })
})
