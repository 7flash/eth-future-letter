module.exports = {
  currentPage: '',
  currentLetterHash: '',
  confirmPayment: {
    done: false,
    paymentAmount: '0.01 ETH',
    paymentAddress: '0xA6279eF0c0C4BEa836E7e22AcC445f74BEa33CbD',
    transactionHash: ''
  },
  fetchLetter: {
    done: false,
    letterHash: '',
    encryptedLetter: ''
  },
  encryptLetter: {
    done: false,
    rawLetter: '',
    encryptedMessage: '',
    senderAddress: '',
    senderPrivateKey: '',
    recipientPublicKey: '',
    recipientPrivateKey: ''
  },
  scheduleLetter : {
    done: false,
    senderAddress: '',
    encryptedMessage: '',
    recipientEmail: '',
    deliveryDate: '',
    letterHash: '',
    transactionHash: ''
  },
  cancelLetter: {
    done: false,
    letterHash: '',
    senderPrivateKey: '',
    transactionHash: ''
  },
  decryptLetter: {
    done: false,
    encryptedMessage: '',
    recipientPrivateKey: '',
    decryptedMessage: ''
  }
}
