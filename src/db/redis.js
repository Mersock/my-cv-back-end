import redis from 'redis'
import bluebird from 'bluebird'

class RedisClient {
    constructor() {
        const client = redis.createClient({ host: process.env.REDIS_URL })
        bluebird.promisifyAll(redis.RedisClient.prototype);
        bluebird.promisifyAll(redis.Multi.prototype);

        client.on("error", function (err) {
            console.log("Redis error encountered", err);
        });

        client.on("end", function () {
            console.log("Redis connection closed");
        });

    }
}

export default new RedisClient()
