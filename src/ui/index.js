const { h, app } = require('hyperapp')

const state = require('./state')
const actions = require('./actions')
const components = require('./components')

const { EncryptLetter, ScheduleLetter, CancelLetter, DecryptLetter } = components({
  update: actions.update,
  request: actions.request
})

app({
  init: () => state,
  view: state =>
    h('section', {}, [
      h('h2', {}, 'Lettoto'),
      h('hr'),
      h('div', {}, [
        EncryptLetter(state.encryptLetter),
        h('hr'),
        ScheduleLetter(state.scheduleLetter),
        h('hr'),
        CancelLetter(state.cancelLetter),
        h('hr'),
        DecryptLetter(state.decryptLetter)
      ])
    ]),
  node: document.getElementById('app')
})
