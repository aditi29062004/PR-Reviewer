import { Router } from 'express';
import mongoose from 'mongoose';
import { redis } from '../config/redis.js';

const router = Router();

// Liveness: is the process up?
router.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Readiness: can we reach Mongo and Redis?
router.get('/ready', async (_req, res) => {
  const mongoUp = mongoose.connection.readyState === 1;
  let redisUp = false;
  try {
    redisUp = (await redis.ping()) === 'PONG';
  } catch {
    redisUp = false;
  }

  const ready = mongoUp && redisUp;
  res.status(ready ? 200 : 503).json({
    status: ready ? 'ready' : 'not_ready',
    mongo: mongoUp ? 'up' : 'down',
    redis: redisUp ? 'up' : 'down',
  });
});

export default router;