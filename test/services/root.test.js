'use strict'

const { test } = require('tap')
const { build } = require('../helper')

test('default root route', async (t) => {
  const app = build(t)

  const res = await app.inject({
    url: '/api'
  })
  t.deepEqual(JSON.parse(res.payload), { message: 'Hello Fastify!' })
})
