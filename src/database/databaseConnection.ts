import {Sequelize} from "sequelize";
import databaseConfig from "../config/database";

let _connection: Sequelize;

const connect = () => {
    return new Sequelize({
        dialect: 'mysql',
        database: databaseConfig.mysql.database,
        username: databaseConfig.mysql.username,
        password: databaseConfig.mysql.password,
        host: databaseConfig.mysql.host,
        port: databaseConfig.mysql.port,
        logging: (sql: string) => {
            // console.log(`MYSQL run Query: ${sql}`);
        }
    });
}

export const getConnection = () => {
    if(_connection) {
        return _connection;
    }

    return _connection = connect();
}
