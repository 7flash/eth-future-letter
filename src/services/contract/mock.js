const { randomHash } = require('../../helpers/crypto')

let letters = {}

module.exports = {
  scheduleLetter: (hash, sender) =>{
    letters[hash] = { hash, sender, status: 'scheduled' }
    const transactionHash = randomHash()
    return transactionHash
  },

  cancelLetter: (hash) => {
    letters[hash].status = 'cancelled'
    const transactionHash = randomHash()
    return transactionHash
  },

  getScheduledLetters: (hash) =>
    Object.keys(letters)
      .filter(hash => letters[hash].status == 'scheduled')
      .map(hash => letters[hash]),

  getLetterSender: (hash) =>
    letters[hash].sender
}
