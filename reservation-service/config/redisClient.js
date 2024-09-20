
import { createClient } from 'redis';


const createRedisClient = async () => {
  const client = createClient({
    url: process.env.REDIS_URL,
  });

  client.on('error', (err) => {
    console.error('Redis Client Error', err);
  });

  await client.connect();
  console.log('Connected to Redis...');
  return client;
};


const createRedisSubscriber = async () => {
  const subscriber = createClient({
    url: process.env.REDIS_URL,
  });

  subscriber.on('error', (err) => {
    console.error('Redis Subscriber Error', err);
  });

  await subscriber.connect();
  console.log('Redis subscriber connected...');
  return subscriber;
};


const redisClient = await createRedisClient();
const redisSubscriber = await createRedisSubscriber();

export { redisClient, redisSubscriber };
