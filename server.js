'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')

const env = process.env;

const config = {
  db: { /* do not put password or any sensitive info here, done only for demo */
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    database: env.DB_NAME,
  },
  port: env.FASTIFY_PORT,
  secret: env.SECRET || 'youshouldspecifyalongsecret'
};


// postgresql://[user[:password]@][netloc][:port][/dbname][?param1=value1&...]
const connectionString = `postgres://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.database}`

// CommonJs
const fastify = require('fastify')({
  logger: true
})

fastify.register(require('@fastify/postgres'), {
  connectionString
})
  .register(require('@fastify/cors'))
  .register(require('@fastify/helmet'))
  .register(require('@fastify/jwt'), {
    secret: config.secret
  })


// This loads all plugins defined in plugins
// those should be support plugins that are reused
// through your application
fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'plugins')
})

// This loads all plugins defined in services
// define your routes in one of these
fastify.register(AutoLoad, {
  dir: path.join(__dirname, 'services')
})

// Run the server!
fastify.listen({ port: config.port, host: '0.0.0.0' }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  fastify.log.info(`Server is now listening on ${address}`)
})