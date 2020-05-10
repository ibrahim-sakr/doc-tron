export default {
    mysql: {
        username: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        host: process.env.MYSQL_HOST,
        port: parseInt(process.env.MYSQL_PORTGO || '3306'),
        database: process.env.MYSQL_DATABASE
    }
}