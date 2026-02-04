import 'dotenv/config';

function parseExpiresToMs(expires: string): number {
  const n = parseInt(expires, 10);
  if (expires.endsWith('d')) return n * 24 * 60 * 60 * 1000;
  if (expires.endsWith('h')) return n * 60 * 60 * 1000;
  if (expires.endsWith('m')) return n * 60 * 1000;
  return n * 1000;
}

export const config = {
  port: parseInt(process.env.API_PORT ?? '4001', 10),
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
  nodeEnv: process.env.NODE_ENV ?? 'development',
  jwt: {
    secret: process.env.JWT_SECRET ?? 'dev-secret-change-me',
    accessExpires: process.env.JWT_ACCESS_EXPIRES ?? '15m',
    refreshExpires: process.env.JWT_REFRESH_EXPIRES ?? '7d',
    get accessExpiresMs() {
      return parseExpiresToMs(this.accessExpires);
    },
    get refreshExpiresMs() {
      return parseExpiresToMs(this.refreshExpires);
    },
  },
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
  },
};
