import databaseConfig from "./src/config/database";

const env = process.env.NODE_ENV || 'local';
const ext = env === 'production' ? 'js' : 'ts'

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
    "src/database/models/**/*." + ext
  ],
  migrations: [
    "src/database/migrations/**/*." + ext
  ],
  subscribers: [
    "src/database/subscribers/**/*." + ext
  ],
  cli: {
    entitiesDir: "src/database/models",
    migrationsDir: "src/database/migrations",
    subscribersDir: "src/database/subscribers"
  }
}
