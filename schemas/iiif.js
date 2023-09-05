'use strict'

const findOne = {
  response: {
    200: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        timestamp: { type: 'integer' },
        done: { type: 'boolean' }
      }
    },
    404: {
      type: 'object',
      properties: {
        message: { type: 'string' }
      }
    }
  },
  params: {
    type: 'object',
    properties: {
      name: { type: 'string' }
    }
  }
}

module.exports = { findOne }
