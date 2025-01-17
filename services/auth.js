'use strict'

const schemas = require('../schemas/auth')

module.exports = async function (fastify, opts) {
  fastify.post('/token', { schema: schemas.token }, async function (request, reply) {
    const { username, password } = request.body
    if (
      process.env.API_USERNAME !== username ||
      process.env.API_PASSWORD !== password
    ) {
      reply.status(401).send({ message: 'Invalid username or password' })
    } else {
      const token = fastify.jwt.sign(
        { sub: user.username },
        { expiresIn: '1h' }
      )
      reply.send({ token })
    }
  })
}

module.exports.autoPrefix = '/auth'
