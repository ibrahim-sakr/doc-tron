import databaseConfig from "./src/config/database";

export = {
  type: "mysql",
  database: databaseConfig.mysql.database,
  username: databaseConfig.mysql.username,
  password: databaseConfig.mysql.password,
  host: databaseConfig.mysql.host,
  port: databaseConfig.mysql.port,
  synchronize: false,
  logging: false,
  migrationsTableName: "migrations",
  entities: [
    "src/database/models/**/*.ts"
  ],
  migrations: [
    "src/database/migrations/**/*.ts"
  ],
  subscribers: [
    "src/database/subscribers/**/*.ts"
  ],
  cli: {
    entitiesDir: "src/database/models",
    migrationsDir: "src/database/migrations",
    subscribersDir: "src/database/subscribers"
  }
}
