const { randomHash } = require('../../helpers/crypto')

let letters = {}

module.exports = {
  saveLetter: (letter) => {
    const letterHash = randomHash()
    letters[letterHash] = letter
    return letterHash
  },

  fetchLetter: (letterHash) =>
    letters[letterHash]
}
