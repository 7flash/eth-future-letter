const effect = require('../helpers/effect')
const { generateAccount, encryptMessage, decryptMessage, signLetterHash, recoverLetterSigner } = require('../helpers/crypto')

const encryptLetter = ({ rawLetter }) => {
  return Promise.all([
    generateAccount(),
    generateAccount()
  ])
    .then(([ senderAccount, recipientAccount ]) => {
      const encryptedMessage = encryptMessage(rawLetter, recipientAccount.privateKey)

      return {
        encryptedMessage,
        senderAddress: senderAccount.address,
        senderPrivateKey: senderAccount.privateKey,
        recipientPrivateKey: recipientAccount.privateKey
      }
    })
}

const scheduleLetter = ({ senderAddress, encryptedMessage, recipientEmail, deliveryDate }) =>
  fetch('/scheduleLetter', {
    method: 'POST',
    body: JSON.stringify({
      sender: senderAddress,
      message: encryptedMessage,
      recipient: recipientEmail,
      date: deliveryDate
    })
  })
    .then(response => response.json())

const cancelLetter = ({ letterHash, senderPrivateKey }) => {
  const senderSignature = signLetterHash(letterHash, senderPrivateKey)

  return fetch('/cancelLetter', {
    method: 'POST',
    body: JSON.stringify({
      letterHash,
      senderSignature
    })
  }).then(response => response.json())
}

const decryptLetter = ({ encryptedMessage, recipientPrivateKey }) => ({
  decryptedMessage: decryptMessage(encryptedMessage, recipientPrivateKey)
})

module.exports = {
  encryptLetter: effect(encryptLetter),
  scheduleLetter: effect(scheduleLetter),
  cancelLetter: effect(cancelLetter),
  decryptLetter: effect(decryptLetter)
}
