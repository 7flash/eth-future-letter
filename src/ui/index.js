const { h, app } = require('hyperapp')

const state = require('./state')
const actions = require('./actions')
const { CreateLetter, CancelLetter, RevealLetter }= require('./components')

const getPage = (url) => {
  const hashPath = url.substring(url.indexOf('#'), url.indexOf('-'))

  if (hashPath == '#cancel')
    return 'cancel'

  if (hashPath == '#reveal')
    return 'reveal'

  return 'create'
}

const getLetterHash = (url) => {
  const letterHash = url.substr(url.indexOf('-0x') + 1)

  return letterHash || ''
}

app({
  init: () => ({
    ...state,
    currentPage: getPage(location.href),
    currentLetterHash: getLetterHash(location.href)
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
