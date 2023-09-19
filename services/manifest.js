'use strict'

//const schemas = require('../schemas/iiif')

module.exports = async function (fastify, opts) {
  fastify.addHook('onRequest', async (request, reply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })

  fastify.setNotFoundHandler(function (request, reply) {
    reply
      .code(404)
      .type('application/json')
      .send({ message: 'Requested todo item does not exist' })
  })

  // CREATE
  fastify.put(
    '',
    //{ schema: schemas.updateOne },
    async function (request, reply) {
      const client = await fastify.pg.connect()
      try {
        // TODO: Create ID - need to determine if use url, database assigned, noid, or doi
        const id = "todo"
        const updated_at = Date.now()
        const manifestJson = request.params.manifest
        // will return a promise, fastify will send the result automatically
        return fastify.pg.transact(async client => {
          // will resolve to an manifest, or reject with an error
          const manifest = await client.query('INSERT INTO manifests(id,updated_at,manifest_json) VALUES($1,$2,$3) RETURNING manifest_json', [id, updated_at, manifestJson])
          // potentially do something with manifest
          return manifest
        })

      } finally {
        // Release the client immediately after query resolves, or upon error
        client.release()
      }
    }
  )

  // UPDATE
  fastify.post(
    '/',
    //{ schema: schemas.insertOne },
    async function (request, reply) {
      const client = await fastify.pg.connect()
      try {
        const updated_at = Date.now()
        const manifestJson = request.params.manifest
        const id = manifestJson['id']
        // will return a promise, fastify will send the result automatically
        return fastify.pg.transact(async client => {
          // will resolve to an manifest, or reject with an error
          const manifest = await client.query("UPDATE manifests SET manifest_json=$1, updated_at=$2 WHERE manifest_json->>'id'=$2", [manifestJson, updated_at, id])
          // potentially do something with manifest
          return manifest
        })

      } finally {
        // Release the client immediately after query resolves, or upon error
        client.release()
      }
    }
  )


  // DELETE
  fastify.delete(
    '/',
    //{ schema: schemas.deleteOne },
    async function (request, reply) {
      const client = await fastify.pg.connect()
      const id = request.params.id
      try {
        // will return a promise, fastify will send the result automatically
        return fastify.pg.transact(async client => {
          // will resolve or reject with an error
          return await client.query("DELETE FROM manifests WHERE manifest_json->>'id'=$1", [id]) 
        })

      } finally {
        // Release the client immediately after query resolves, or upon error
        client.release()
      }
    }
  )
}

module.exports.autoPrefix = '/manifest'
