const path = require('path')
const fastify = require('fastify')({ logger: true })
const contract = require('../src/services/contract/mock')
const storage = require('../src/services/storage/mock')
const scheduler = require('../src/services/scheduler')({
  contract, storage
})

const main = async () => {
  fastify.post('/scheduleLetter', async (request, reply) => {
    const args = JSON.parse(request.body)

    const response = await scheduler.scheduleLetter(args)

    reply.type('application/json').code(200)
    return response
  })

  fastify.post('/cancelLetter', async (request, reply) => {
    const args = JSON.parse(request.body)

    const response = await scheduler.cancelLetter(args)

    reply.type('application/json').code(200)
    return response
  })

  fastify.post('/fetchLetter', async (request, reply) => {
    const args = JSON.parse(request.body)

    const response = await scheduler.fetchLetter(args)

    reply.type('application/json').code(200)
    return response
  })

  fastify.register(require('fastify-static'), {
    root: path.join(__dirname, '..', 'dist')
  })

  await fastify.listen(process.env.PORT || 3000)
}

main()
