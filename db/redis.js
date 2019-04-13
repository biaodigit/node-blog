const redis = require('redis')
const { REDIS_CONF } = require('../config/db.js')

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
    console.error(err)
})

module.exports = redisClient