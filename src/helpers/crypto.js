const CryptoJS = require('crypto-js')
const Account = require('eth-lib/lib/account')
const crypto = require('crypto')

module.exports = {
    randomHash: () => '0x' + crypto.randomBytes(20).toString('hex'),
    generateAccount: Account.create,
    signLetterHash: Account.sign,
    recoverLetterSigner: Account.recover,
    encryptMessage: (message, key) => CryptoJS.AES.encrypt(message, key).toString(),
    decryptMessage: (message, key) => CryptoJS.AES.decrypt(message.toString(), key).toString(CryptoJS.enc.Utf8)
}
