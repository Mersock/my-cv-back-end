const redis = require('redis')
const client = redis.createClient({ host: process.env.REDIS_URL })
const bluebird = require('bluebird')

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

client.on("error", function (err) {
    console.log("Redis error encountered", err);
});

client.on("end", function () {
    console.log("Redis connection closed");
});


module.exports = client