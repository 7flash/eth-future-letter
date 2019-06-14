const { h } = require('hyperapp')

const ConfirmPayment = ({
  requests: { confirmPayment: request },
  updates: { confirmPayment: update }
}, {
  confirmPayment: {
    paymentAmount, paymentAddress, transactionHash
  }
}) => ([
  h('h3', {}, '3. Confirm payment'),
  h('h4', {}, `Send ${paymentAmount} ETH to address: ${paymentAddress}`),
  h('button', {
    onclick: [
      request, {}
    ]
  }, 'Confirm payment')
])

const RecoveryInfo = ({}, {
  encryptLetter: {
    senderPrivateKey,
    recipientPrivateKey
  },
  scheduleLetter: {
    letterHash,
    transactionHash,
    recipientEmail,
    deliveryDate
  }
}) => ([
  h('h3', {}, '4. Thanks for using our service!'),
  h('h4', {}, [
    h('h4', {}, `Letter scheduled on transaction: `),
    h('a', { href: `etherscan.io/${transactionHash}` }, `https://etherscan.io/${transactionHash}`)
  ]),
  h('h4', {}, `Letter will be delivered to ${recipientEmail} by ${deliveryDate}`),
  h('h3', {}, 'How does recipient reveal the letter?'),
  h('h4', {}, `When recipient receive notification, he has to visit reveal link and use his private key to decrypt the letter`),
  h('h3', {}, 'How to cancel the letter?'),
  h('h4', {}, `If you want cancel letter delivery you have to visit cancel link and use your private key to cancel the letter`),
  h('h3', {}, 'Recovery Info'),
  h('h4', {}, 'Important! We do not store your private keys, ensure you keep it safely'),
  h('h4', {}, `Sender private key: ${senderPrivateKey}`),
  h('h4', {}, `Recipient private key: ${recipientPrivateKey}`),
  h('h4', {}, [
    h('h4', {}, `Reveal link: `),
    h('a', { href: `${window.location}#reveal-${letterHash}` }, `${window.location}#reveal-${letterHash}`)
  ]),
  h('h4', {}, [
    h('h4', {}, `Cancel link: `),
    h('a', { href: `${window.location}#cancel-${letterHash}` }, `${window.location}#cancel-${letterHash}`)
  ])
])

const EncryptLetter = ({
  requests: { encryptLetter: request },
  updates: { encryptLetter: update }
}, {
  encryptLetter: {
    rawLetter,
      encryptedMessage,
      senderAddress,
      senderPrivateKey,
      recipientPrivateKey
  }
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

const ScheduleLetter = ({
  requests: { scheduleLetter: request },
  updates: { scheduleLetter: update }
}, {
  scheduleLetter: {
    // encryptedMessage,
    recipientEmail,
      deliveryDate,
      // senderAddress,
      letterHash,
      transactionHash
  },
  encryptLetter: {
    encryptedMessage,
      senderAddress
  }
}) => ([
  h('h3', {}, '2. Schedule Letter'),
  h('input', {
    type: 'text',
    placeholder: 'Encrypted Letter',
    value: encryptedMessage,
    disabled: true,
    // oninput: update('encryptedMessage')
  }),
  h('input', {
    type: 'text',
    placeholder: 'Sender address',
    value: senderAddress,
    disabled: true,
    // oninput: update('senderAddress')
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

const DecryptLetter = ({
  requests: { decryptLetter: request },
  updates: { decryptLetter: update }
}, {
  fetchLetter: {
    message: encryptedMessage
  },
  decryptLetter: {
    recipientPrivateKey,
    decryptedMessage
  }
}) => ([
  h('h3', {}, '2. Decrypt Letter'),
  decryptedMessage ?
    h('h4', {}, `Decrypted message: ${decryptedMessage}`) :
    h('div', {}, [
      h('input', {
        type: 'text',
        placeholder: 'Encrypted Letter',
        value: encryptedMessage,
        disabled: true,
        // oninput: update('encryptedMessage')
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
      }, 'Decrypt Letter')
    ])
])

const FetchLetter = ({
  requests: { fetchLetter: request },
  updates: { fetchLetter: update }
}, {
  currentLetterHash: letterHash
}) => ([
  h('h3', {}, '1. Fetch encrypted letter'),
  h('input', {
    type: 'text',
    placeholder: 'Letter hash',
    value: letterHash,
    disabled: true
  }),
  h('button', {
    onclick: [request, {
      letterHash
    }]
  }, 'Fetch Letter')
])

const CreateLetter = (actions, state) => ([
    state.encryptLetter.done == false ?
      EncryptLetter(actions, state) :

      state.scheduleLetter.done == false ?
        ScheduleLetter(actions, state) :

        state.confirmPayment.done == false ?
          ConfirmPayment(actions, state) :

          RecoveryInfo(actions, state)
])

const CancelLetter = ({
  requests: { cancelLetter: request },
  updates: { cancelLetter: update }
}, {
  currentLetterHash: letterHash,
  cancelLetter: {
    senderPrivateKey,
    transactionHash
  }
}) => ([
  h('h3', {}, '1. Cancel Letter'),
  transactionHash ?
    h('h4', {}, `Letter cancelled on transaction: ${transactionHash}`) :
    h('div', {}, [
      h('input', {
        type: 'text',
        placeholder: 'Letter hash',
        value: letterHash,
        disabled: true,
        // oninput: update('letterHash')
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
      }, 'Cancel Letter')
    ])
])

const RevealLetter = (actions, state) => ([
  state.fetchLetter.done == false ?
    FetchLetter(actions, state) :
    DecryptLetter(actions, state)
])

module.exports = {
  CreateLetter,
  CancelLetter,
  RevealLetter
}
