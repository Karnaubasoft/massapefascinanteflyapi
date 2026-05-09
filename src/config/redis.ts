import Redis from "ioredis";
import { env } from "./env";

let redisInstance: Redis | null = null;

export function getRedis(): Redis {
  if (!env.REDIS_URL) {
    throw new Error("REDIS_URL is not configured");
  }

  if (!redisInstance) {
    const shouldUseTls = env.REDIS_URL.startsWith("rediss://");

    redisInstance = new Redis(env.REDIS_URL, {
      ...(shouldUseTls ? { tls: {} } : {}),
      maxRetriesPerRequest: null,
      reconnectOnError: () => true,
    });

    redisInstance.on("error", (error) => {
      console.error("[redis] connection error:", error.message);
    });
  }

  return redisInstance;
}
