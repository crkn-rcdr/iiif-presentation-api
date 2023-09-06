'use strict'

//const schemas = require('../schemas/iiif')

module.exports = async function (fastify, opts) {

  fastify.setNotFoundHandler(function (request, reply) {
    reply
      .code(404)
      .type('application/json')
      .send({ message: 'Requested todo item does not exist' })
  })

  /*fastify.get(
    '/',
    { schema: schemas.findAll },
    async function (request, reply) {
      const limit = parseInt(request.query.limit) || 0
      const offset = parseInt(request.query.offset) || 0
      return this.mongo.db
        .collection('todo')
        .find()
        .sort({ timestamp: -1 })
        .skip(offset)
        .limit(limit)
        .toArray()
    }
  )*/

  fastify.get(
    '/:id/manifest',
    //{ schema: schemas.findOne },
    async function (request, reply) {
      const client = await fastify.pg.connect()
      try {
        const { rows } = await client.query(
          "SELECT * FROM manifests WHERE manifest_json->>'id' =$1", ['http://10.5.0.5:5000/iiif/' + request.params.id + '/manifest'],
        )
        // Note: avoid doing expensive computation here, this will block releasing the client
        return rows.length ? rows[0]['manifest_json'] : { error : "item not found." }
      } finally {
        // Release the client immediately after query resolves, or upon error
        client.release()
      }
    }
  )

  /*fastify.post(
    '/',
    { schema: schemas.insertOne },
    async function (request, reply) {
      return this.mongo.db.collection('todo').insertOne(
        Object.assign(request.body, {
          timestamp: this.timestamp(),
          done: false
        })
      )
    }
  )

  fastify.put(
    '/:name',
    { schema: schemas.updateOne },
    async function (request, reply) {
      return this.mongo.db
        .collection('todo')
        .findOneAndUpdate(
          { name: request.params.name },
          { $set: { done: request.body.done } }
        )
    }
  )

  fastify.delete(
    '/:name',
    { schema: schemas.deleteOne },
    async function (request, reply) {
      return this.mongo.db
        .collection('todo')
        .deleteOne({ name: request.params.name })
    }
  )*/
}

module.exports.autoPrefix = '/iiif'
