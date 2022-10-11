const redis = require("redis");
const { promisify } = require("util");

const config = require("../config/config.json");
console.log(config.redis)
const client = redis.createClient(config.redis);
client.on('error', (err) => console.log('Redis Client Error', err));

const get = promisify(client.get).bind(client);
const set = promisify(client.set).bind(client);
const del = promisify(client.del).bind(client);
const keys = promisify(client.keys).bind(client);
// const connect = promisify(client.connect).bind(client);

module.exports = {
 get, set, del, keys, 
};