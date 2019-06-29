const executor = ({ contract, storage, mailer }) =>
  R.compose(
    Promise.all,
    p => p.then(letters => letters.map(
      R.compose(
        p => p.then(
          ({ message, recipient, date }) =>
            new Date() > date && mailer.send(message, recipient)
        ),
        storage.fetchLetter
      )
    ))
    contract.getScheduledLetters
  )

  R.compose(
    letters => letters.thenmap(
      letterHash => R.compose(
        (p) => p.then(
          letterHash =>

        )
        storage.fetchLetter
      )
    )
    contract.getScheduledLetters
  )
{
  const letters = await contract.getScheduledLetters()

  return letters.map()

  letters.forEach(async (letterHash) => {
    const { message, recipient, date } =
      await storage.fetchLetter(letterHash)

    if (date <= now)
      await mailer.send(message, recipient)
  })
}

module.exports = executor
