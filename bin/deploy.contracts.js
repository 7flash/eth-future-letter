const { artifacts } = require('@nomiclabs/buidler')
const Contract = artifacts.require('Letters')

const main = async () => {
  const { address, transactionHash } = await Contract.new()

  console.log(`Letters address: ${address} 🚀 (tx: ${transactionHash})`)

  process.exit(1)
}

main()
