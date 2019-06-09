const { h } = require('hyperapp')

const EncryptLetter = ({ update, request }) => ({
    rawLetter,
    encryptedMessage,
    senderAddress,
    senderPrivateKey,
    recipientPrivateKey
  }) => ([
  h('h3', {}, '1. Encrypt Letter'),
  h('input', {
    type: 'text',
    placeholder: 'Raw Letter',
    value: rawLetter,
    oninput: update('rawLetter')
  }),
  h('button', {
    onclick: [request, {
      rawLetter
    }]
  }, 'Encrypt Letter'),
  encryptedMessage && h('p', {}, `Encrypted message: ${encryptedMessage}`),
  senderAddress && h('p', {}, `Sender address: ${senderAddress}`),
  senderPrivateKey && h('p', {}, `Sender private key: ${senderPrivateKey}`),
  recipientPrivateKey && h('p', {}, `Recipient private key: ${recipientPrivateKey}`),
])

const ScheduleLetter = ({ update, request }) => ({
    encryptedMessage,
    recipientEmail,
    deliveryDate,
    senderAddress,
    letterHash,
    transactionHash
  }) => ([
  h('h3', {}, '2. Schedule Letter'),
  h('input', {
    type: 'text',
    placeholder: 'Encrypted Letter',
    value: encryptedMessage,
    oninput: update('encryptedMessage')
  }),
  h('input', {
    type: 'text',
    placeholder: 'Sender address',
    value: senderAddress,
    oninput: update('senderAddress')
  }),
  h('input', {
    type: 'text',
    placeholder: 'Recipient email',
    value: recipientEmail,
    oninput: update('recipientEmail')
  }),
  h('input', {
    type: 'date',
    placeholder: 'Delivery date',
    value: deliveryDate,
    oninput: update('deliveryDate')
  }),
  h('button', {
    onclick: [request, {
      senderAddress, encryptedMessage, recipientEmail, deliveryDate
    }]
  }, 'Schedule Letter'),
  transactionHash && h('p', {}, `Letter scheduled on transaction: ${transactionHash}`),
  letterHash && h('p', {}, `Letter hash: ${letterHash}`)
])

const CancelLetter = ({ update, request }) => ({
    letterHash,
    senderPrivateKey,
    transactionHash
  }) => ([
  h('h3', {}, '3. Cancel Letter'),
  h('input', {
    type: 'text',
    placeholder: 'Letter hash',
    value: letterHash,
    oninput: update('letterHash')
  }),
  h('input', {
    type: 'text',
    placeholder: 'Sender private key',
    value: senderPrivateKey,
    oninput: update('senderPrivateKey')
  }),
  h('button', {
    onclick: [request, {
      letterHash, senderPrivateKey
    }]
  }, 'Cancel Letter'),
  transactionHash && h('p', {}, `Letter canceled on transaction: ${transactionHash}`)
])

const DecryptLetter = ({ update, request }) => ({
    encryptedMessage,
    recipientPrivateKey,
    decryptedMessage
  }) => ([
  h('h3', {}, '4. Decrypt Letter'),
  h('input', {
    type: 'text',
    placeholder: 'Encrypted Letter',
    value: encryptedMessage,
    oninput: update('encryptedMessage')
  }),
  h('input', {
    type: 'text',
    placeholder: 'Recipient private key',
    value: recipientPrivateKey,
    oninput: update('recipientPrivateKey')
  }),
  h('button', {
    onclick: [request, {
      encryptedMessage, recipientPrivateKey
    }]
  }, 'Decrypt Letter'),
  decryptedMessage && h('p', {}, `Decrypted message: ${decryptedMessage}`)
])

module.exports = (actions) => ({
  EncryptLetter: EncryptLetter({
    request: actions.request('encryptLetter'),
    update: actions.update('encryptLetter')
  }),
  ScheduleLetter: ScheduleLetter({
    request: actions.request('scheduleLetter'),
    update: actions.update('scheduleLetter')
  }),
  CancelLetter: CancelLetter({
    request: actions.request('cancelLetter'),
    update: actions.update('cancelLetter')
  }),
  DecryptLetter: DecryptLetter({
    request: actions.request('decryptLetter'),
    update: actions.update('decryptLetter')
  })
})
