'use strict'

//const schemas = require('../schemas/iiif')


module.exports = async function (fastify, opts) {

  fastify.setNotFoundHandler(function (request, reply) {
    reply
      .code(404)
      .type('application/json')
      .send({ message: 'Requested route does not exist' })
  })

  fastify.get(
    '/:id/collection',
    //{ schema: schemas.findOne },
    async function (request, reply) {
      const client = await fastify.pg.connect()
      return { error: "Endpoint not implemented" }
    }
  )

  /*fastify.get(
    '/manifest',
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
    '/:manifestId/manifest',
    //{ schema: schemas.findOne },
    async function (request, reply) {
      const client = await fastify.pg.connect()
      try {
        const { rows } = await client.query(
          "SELECT * FROM manifests WHERE manifest_json->>'id' =$1", ['http://10.5.0.5:5000/iiif/' + request.params.manifestId + '/manifest'],
        )
        // Note: avoid doing expensive computation here, this will block releasing the client
        return rows.length ? rows[0]['manifest_json'] : { error : "Not found." }
      } finally {
        // Release the client immediately after query resolves, or upon error
        client.release()
      }
    }
  )

  fastify.get(
    '/:manifestId/canvas/:canvasIdPrefix/:canvasIdSuffix',
    //{ schema: schemas.findOne },
    async function (request, reply) {
      const client = await fastify.pg.connect()

      let manifest;
      try {
        const { rows } = await client.query(
          "SELECT * FROM manifests WHERE manifest_json->>'id' =$1", ['http://10.5.0.5:5000/iiif/' + request.params.manifestId + '/manifest'],
        )
        // Note: avoid doing expensive computation here, this will block releasing the client
        if(rows.length) manifest = rows[0]['manifest_json']
      } finally {
        // Release the client immediately after query resolves, or upon error
        client.release()
      }

      let canvas = { 'error' : 'Not found' }
      for (let item of manifest['items']) {
        if (item['id'] == 'http://10.5.0.5:5000/iiif/'+request.params.manifestId+'/canvas/'+request.params.canvasIdPrefix+'/'+request.params.canvasIdSuffix) {
          canvas = item
          break
        }
      }
      return canvas
    }
  )

  fastify.get(
    '/:manifestId/annotationpage/:canvasIdPrefix/:canvasIdSuffix/:annotationPageName',
    //{ schema: schemas.findOne },
    async function (request, reply) {
      const client = await fastify.pg.connect()

      let manifest;
      try {
        const { rows } = await client.query(
          "SELECT * FROM manifests WHERE manifest_json->>'id' =$1", ['http://10.5.0.5:5000/iiif/' + request.params.manifestId + '/manifest'],
        )
        // Note: avoid doing expensive computation here, this will block releasing the client
        if(rows.length) manifest = rows[0]['manifest_json']
      } finally {
        // Release the client immediately after query resolves, or upon error
        client.release()
      }

      let annotationpage = { 'error' : 'Not found.' }
      for (let item of manifest['items']) {
        if (item['id'] == 'http://10.5.0.5:5000/iiif/'+request.params.manifestId+'/canvas/'+request.params.canvasIdPrefix+'/'+request.params.canvasIdSuffix){
          for (let canvasItem of item['items']){
            if (canvasItem['id'] == 'http://10.5.0.5:5000/iiif/'+request.params.manifestId+'/annotationpage/'+request.params.canvasIdPrefix+'/'+request.params.canvasIdSuffix+'/'+request.params.annotationPageName){
              annotationpage = canvasItem
              break
            }
          }
        }
      }
      return annotationpage
    }
  )


  fastify.get(
    '/:manifestId/annotation/:canvasIdPrefix/:canvasIdSuffix/:annotationPageName/:annotationId',
    //{ schema: schemas.findOne },
    async function (request, reply) {
      const client = await fastify.pg.connect()

      let manifest;
      try {
        const { rows } = await client.query(
          "SELECT * FROM manifests WHERE manifest_json->>'id' =$1", ['http://10.5.0.5:5000/iiif/' + request.params.manifestId + '/manifest'],
        )
        // Note: avoid doing expensive computation here, this will block releasing the client
        if(rows.length) manifest = rows[0]['manifest_json']
      } finally {
        // Release the client immediately after query resolves, or upon error
        client.release()
      }

      let annotation={ 'error' : 'Not found.' }
      if(manifest) {
        for (let item of manifest['items']) {
          if (item['id'] == 'http://10.5.0.5:5000/iiif/'+request.params.manifestId+'/canvas/'+request.params.canvasIdPrefix+'/'+request.params.canvasIdSuffix) {
            for (let canvasItem of item['items']){
              if (canvasItem['id'] == 'http://10.5.0.5:5000/iiif/'+request.params.manifestId+'/annotationpage/'+request.params.canvasIdPrefix+'/'+request.params.canvasIdSuffix+'/'+request.params.annotationPageName) {
                for (let annotationpageItem of canvasItem['items']) {
                  if (annotationpageItem['id'] == 'http://10.5.0.5:5000/iiif/'+request.params.manifestId+'/annotation/'+request.params.canvasIdPrefix+'/'+request.params.canvasIdSuffix+'/'+request.params.annotationPageName+'/'+request.params.annotationId) {
                    annotation = annotationpageItem
                    break
                  }
                }
              }
            }
          }
        }
      }
      return annotation
    }
  )
}

module.exports.autoPrefix = '/iiif'
