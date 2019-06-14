const { recoverLetterSigner } = require('../../helpers/crypto')

const scheduler = ({ storage, contract }) => ({
  scheduleLetter: async ({ sender, message, recipient, date }) => {
    const letterHash = await storage.saveLetter({ message, recipient, date })

    const transactionHash = await contract.scheduleLetter(letterHash, sender)

    return { letterHash, transactionHash }
  },

  cancelLetter: async ({ letterHash, senderSignature }) => {
    const letterSender = await contract.getLetterSender(letterHash)

    if (recoverLetterSigner(letterHash, senderSignature) === letterSender) {
      const transactionHash = await contract.cancelLetter(letterHash)

      return { transactionHash }
    } else {
      throw new Error('invalid signature')
    }
  },

  fetchLetter: async ({ letterHash }) => {
    const encryptedMessage = await storage.fetchLetter(letterHash)

    return { encryptedMessage }
  }
})

module.exports = scheduler
