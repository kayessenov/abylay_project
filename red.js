const redis = require("./cache-storage/redisClient");

(async ()=>{
    // await redis.connect()
    console.log(123222)

    // await redis.set("abylay", "Decode", "EX", 60 * 60 * 24 * 7)
    console.log(123)
    const result = await redis.get("abylay")
    console.log({result})

})()