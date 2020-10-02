module.exports = [
  {
    // Соединение для local окружения
    name: "development",
    type: "postgres",
    host: process.env.POSTGRES_HOST || "localhost",
    port: 5432,
    username: "postgres",
    password: "ilt0q1drzye",
    database: process.env.DB_NAME || "api_local",
    logging: true,
    dropSchema: false,
    entities: ["dist/apps/api/apps/api/src/**/*.entity.js"],
    synchronize: false,
    migrationsRun: true,
    cli: {
      entitiesDir: ["apps/api/src/**/entities"],
      migrationsDir: ["apps/api/src/migrations"],
      subscribersDir: ["apps/api/src/subscribers"],
    },
  }
];
