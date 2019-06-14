const { h, app } = require('hyperapp')

const state = require('./state')
const actions = require('./actions')
const { CreateLetter, CancelLetter, RevealLetter } = require('./components')

const getCurrentPage = () => {
  const hashPath = location.hash.substring(0, location.hash.indexOf('-'))

  if (hashPath == '#cancel')
    return 'cancel'

  if (hashPath == '#reveal')
    return 'reveal'

  return 'create'
}

const getCurrentLetterHash = () => {
  const letterHash = location.hash.substring(location.hash.indexOf('-') + 1)

  return letterHash || ''
}

app({
  init: () => ({
    ...state,
    currentPage: getCurrentPage(),
    currentLetterHash: getCurrentLetterHash()
  }),
  view: state =>
    h('section', {}, [
      h('h2', {}, 'Lettoto'),
      h('hr'),
      h('div', {}, [
        state.currentPage == 'create' && CreateLetter(actions, state),
        state.currentPage == 'cancel' && CancelLetter(actions, state),
        state.currentPage == 'reveal' && RevealLetter(actions, state)
      ])
    ]),
  node: document.getElementById('app')
})
