
import redis from 'redis';

const redisClient = redis.createClient({
  url: process.env.REDIS_URL
});

redisClient.connect()
  .then(() => console.log('Connected to Redis...'))
  .catch((err) => console.error('Redis error:', err));

export default redisClient;
