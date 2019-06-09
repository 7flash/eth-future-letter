const { describe } = require('riteway')
const { generateAccount, encryptMessage, decryptMessage, signLetterHash, recoverLetterSigner } = require('../src/helpers/crypto')

describe('Crypto', async assert => {
  const rawMessage = 'lettoto'
  const letterHash = '0x123'

  const senderAccount = generateAccount()
  const recipientAccount = generateAccount()

  const encryptedMessage = encryptMessage(rawMessage, recipientAccount.privateKey)
  const decryptedMessage = decryptMessage(encryptedMessage.toString(), recipientAccount.privateKey)

  const signature = signLetterHash(letterHash, senderAccount.privateKey)
  const recoveredAddress = recoverLetterSigner(letterHash, signature)

  assert({
    given: 'encryption',
    should: 'restore message',
    actual: decryptedMessage.toString(),
    expected: rawMessage
  })

  assert({
    given: 'signing',
    should: 'restore signer',
    actual: recoveredAddress,
    expected: senderAccount.address
  })
})
