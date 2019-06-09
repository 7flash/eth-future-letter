const { mergeDeepRight } = require('ramda')
const effects = require('./effects')

const response = (module) => (state, payload) =>
  mergeDeepRight(state, {
    [module]: {
      ...payload
    }
  })

const update = (module) => (field) => (state, event) =>
  mergeDeepRight(state, {
    [module]: {
      [field]: event.target.value
    }
  })

const request = (module) =>
  (state, payload) => [
    state, [
      effects[module](response(module)),
      payload
    ]
  ]

module.exports = {
  request, update
}
