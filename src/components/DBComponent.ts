import {ComponentInterface, Settings} from 'he-loader';
import {createConnection} from "typeorm";

export default class DBComponent implements ComponentInterface {
    async load(settings: Settings) {
        // connection options defined in ~/ormconfig.ts
        await createConnection().then(() => {
            console.log('Database Connected');
        });
    }
}
