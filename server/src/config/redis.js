import Redis from 'ioredis';
import { env } from './env.js';
import { logger } from './logger.js';

// BullMQ requires maxRetriesPerRequest: null.
// lazyConnect means importing this file never opens a connection by itself.
export const redis = new Redis(env.REDIS_URL, {
  maxRetriesPerRequest: null,
  lazyConnect: true,
});

redis.on('error', (err) => logger.error({ err: err.message }, 'Redis error'));
redis.on('ready', () => logger.info('Redis connected'));