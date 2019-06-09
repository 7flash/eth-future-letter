const { describe } = require('riteway')
const { signLetterHash } = require('../src/helpers/crypto')
const contract = require('../src/services/contract/mock')
const storage = require('../src/services/storage/mock')
const scheduler = require('../src/services/scheduler')({
  contract, storage
})

const senderPrivateKey = '0x9b9a6ba6f3df42dd0f41336422ff47e5eb8228a282a045b3f51f7a8c7ba1951f'
const sender = '0x29Bd539C8b3929837E83b5eb82F413D1d72233cc'
const message = 'U2FsdGVkX1+6DwJlO1uyj9tJUaLOD4pn2ih6b/gcb6E='
const recipient = 'example@diadem.network'
const date = '2019-06-10'

describe('Scheduler', async assert => {
  const { letterHash, transactionHash } = await scheduler.scheduleLetter({
    sender,
    message,
    recipient,
    date
  })

  assert({
    given: 'scheduled letter',
    should: 'save letter link in contract',
    actual: await contract.getScheduledLetters(),
    expected: [{
      status: 'scheduled',
      hash: letterHash,
      sender
    }]
  })

  assert({
    given: 'scheduled letter',
    should: 'save letter on storage',
    actual: await storage.fetchLetter(letterHash),
    expected: {
      message, recipient, date
    }
  })

  const senderSignature = signLetterHash(letterHash, senderPrivateKey)

  await scheduler.cancelLetter({
    letterHash, senderSignature
  })

  assert({
    given: 'cancelled letter',
    should: 'have no scheduled letters',
    actual: await contract.getScheduledLetters(),
    expected: []
  })
})
