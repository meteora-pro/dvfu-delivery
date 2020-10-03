module.exports = [
  {
    // Соединение для local окружения
    name: "default",
    type: "postgres",
    host: process.env.POSTGRES_HOST || "localhost",
    port: +process.env.POSTGRES_PORT || 5432,
    username: process.env.POSTGRES_USERNAME || "postgres",
    password: process.env.POSTGRES_PASSWORD || "ilt0q1drzye",
    database: process.env.DB_NAME || "api_local",
    logging: true,
    dropSchema: false,
    entities: ["dist/apps/api/apps/api/src/**/*.entity.js"],
    synchronize: true,
    migrationsRun: false,
    cli: {
      entitiesDir: ["apps/api/src/**/entities"],
      migrationsDir: ["apps/api/src/migrations"],
      subscribersDir: ["apps/api/src/subscribers"],
    },
  }
];
