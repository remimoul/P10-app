import { Injectable, Logger } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  private client: RedisClientType;
  private isConnected = false;
  private readonly logger = new Logger(RedisService.name);

  async onModuleInit() {
    try {
      const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
      this.client = createClient({ url: redisUrl });

      this.client.on('error', (err) => {
        this.logger.warn(`Redis error: ${err.message}`);
        this.isConnected = false;
      });

      this.client.on('connect', () => {
        this.logger.log('Redis connected ✅');
        this.isConnected = true;
      });

      await this.client.connect();
    } catch (error) {
      this.logger.warn(
        `Redis connection failed, operating in fallback mode: ${error.message}`,
      );
      this.isConnected = false;
    }
  }

  async onModuleDestroy() {
    if (this.client) {
      await this.client.quit();
    }
  }

  /**
   * Get value from cache
   * Returns null if key doesn't exist or Redis is unavailable
   */
  async get(key: string): Promise<string | null> {
    try {
      if (!this.isConnected) return null;
      return await this.client.get(key);
    } catch (error) {
      this.logger.warn(`Redis GET error for key ${key}: ${error.message}`);
      return null; // Fallback: no cache
    }
  }

  /**
   * Set value in cache with TTL (Time To Live)
   * Gracefully fails if Redis is unavailable
   */
  async setex(key: string, seconds: number, value: string): Promise<void> {
    try {
      if (!this.isConnected) return; // Fallback: silently skip cache
      await this.client.setEx(key, seconds, value);
    } catch (error) {
      this.logger.warn(`Redis SETEX error for key ${key}: ${error.message}`);
      // Fallback: continue without cache
    }
  }

  /**
   * Delete key from cache
   */
  async del(key: string): Promise<void> {
    try {
      if (!this.isConnected) return;
      await this.client.del(key);
    } catch (error) {
      this.logger.warn(`Redis DEL error for key ${key}: ${error.message}`);
    }
  }

  /**
   * Clear all cache keys matching pattern
   */
  async deletePattern(pattern: string): Promise<void> {
    try {
      if (!this.isConnected) return;
      const keys = await this.client.keys(pattern);
      if (keys.length > 0) {
        await this.client.del(keys);
      }
    } catch (error) {
      this.logger.warn(
        `Redis DELETEPATTERN error for pattern ${pattern}: ${error.message}`,
      );
    }
  }

  /**
   * Check if Redis is available
   */
  isAvailable(): boolean {
    return this.isConnected;
  }
}
