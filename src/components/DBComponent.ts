import {ComponentInterface, Settings} from 'he-loader';
import {ConnectionOptions, createConnection, getConnectionOptions} from "typeorm";
import ormConfig from "../../ormconfig";

export default class DBComponent implements ComponentInterface {
    async load(settings: Settings) {

        const connectionOptions: ConnectionOptions = await getConnectionOptions();
        Object.assign(connectionOptions, ormConfig);

        await createConnection(connectionOptions).then(() => {
            console.log('Database Connected');
        });
    }
}
