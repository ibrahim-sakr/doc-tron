import {ComponentInterface, Settings} from 'he-loader';
import {getConnection} from "../database/databaseConnection";

export default class DBComponent implements ComponentInterface {
    load(settings: Settings) {
        return new Promise((resolve, reject) => {
            const db = getConnection();

            db.authenticate()
                .then(() => {
                    console.log('Database Connected.');
                    return resolve();
                })
                .catch(err => {
                    console.error('Unable to connect to the database: ', err);
                    return reject();
                });
        });
    }
}