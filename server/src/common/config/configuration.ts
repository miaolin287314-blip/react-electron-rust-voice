export default () => ({
  app: {
    port: parseInt(process.env.APP_PORT ?? '3000', 10),
  },

  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT ?? '3306', 10),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },

  jwt: {
    secret:
      process.env.JWT_SECRET ||
      (process.env.NODE_ENV === 'production'
        ? undefined
        : 'local-development-secret-change-in-production'),
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
});