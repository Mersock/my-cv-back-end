import redis from 'redis'
import bluebird from 'bluebird'

const redisConnect = () => {
    let client = redis.createClient({ host: process.env.REDIS_URL })
    bluebird.promisifyAll(redis.RedisClient.prototype);
    bluebird.promisifyAll(redis.Multi.prototype);

    client.on("error", function (err) {
        console.log("Redis error encountered", err);
    });

    client.on("end", function () {
        console.log("Redis connection closed");
    });
    
    return client
}


export default redisConnect() 
