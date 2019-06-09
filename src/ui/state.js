module.exports = {
  encryptLetter: {
    rawLetter: '',
    encryptedMessage: '',
    senderAddress: '',
    senderPrivateKey: '',
    recipientPublicKey: '',
    recipientPrivateKey: ''
  },
  scheduleLetter : {
    senderAddress: '',
    encryptedMessage: '',
    recipientEmail: '',
    deliveryDate: '',
    letterHash: '',
    transactionHash: ''
  },
  cancelLetter: {
    letterHash: '',
    senderPrivateKey: '',
    transactionHash: ''
  },
  decryptLetter: {
    encryptedMessage: '',
    recipientPrivateKey: '',
    decryptedMessage: ''
  }
}
