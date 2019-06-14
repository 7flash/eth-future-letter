const { mergeDeepRight } = require('ramda')
const effects = require('./effects')

const modules = [
  'confirmPayment',
  'fetchLetter',
  'encryptLetter',
  'scheduleLetter',
  'cancelLetter',
  'decryptLetter'
]

const updateFn = (module) => (field) => (state, event) =>
  mergeDeepRight(state, {
    [module]: {
      [field]: event.target.value
    }
  })

const requestFn = (module) => (state, payload) => [
  state, [
    effects[module](responseFn(module)),
    payload
  ]
]

const responseFn = (module) => (state, payload) =>
  mergeDeepRight(state, {
    [module]: {
      ...payload,
      done: true
    }
  })

const updates = modules.map(
  module => [module, updateFn(module)]
).reduce((obj, item) => {
    obj[item[0]] = item[1]
    return obj
  }, {})

const requests = modules.map(
  module => [module, requestFn(module)]
)
  .reduce((obj, item) => {
    obj[item[0]] = item[1]
    return obj
  }, {})

module.exports = {
  requests, updates
}
