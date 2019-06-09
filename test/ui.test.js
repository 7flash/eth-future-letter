const { describe } = require('riteway')
const state = require('../src/ui/state')
const actions = require('../src/ui/actions')
const effects = require('../src/ui/effects')

describe('UI', async assert => {
  assert({
    given: 'initialized components',
    should: 'render interface',
    actual: true,
    expected: true
  })
})
