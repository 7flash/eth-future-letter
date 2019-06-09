const effect = (handler) => (action) =>
  (dispatch, payload) =>
    Promise.resolve(payload)
      .then(handler)
      .then(response =>
        dispatch(action, response)
      )

module.exports = effect
