import { ComponentInterface, Settings } from 'he-loader';
import appConfig from '../config/app';
import * as bodyParser from 'body-parser';
import App from '../apis/App';
import loggerMiddleware from '../apis/middlewares/logger';
import AuthController from '../apis/controllers/AuthController';
import UsersController from '../apis/controllers/UsersController';
import JobController from '../apis/controllers/JobController';
import LogController from '../apis/controllers/LogController';

export default class ApiComponent implements ComponentInterface {

    load(settings: Settings) {
        return new Promise((resolve) => {
            const app = new App({
                port: appConfig.port,
                controllers: [
                    new AuthController,
                    new UsersController,
                    new JobController,
                    new LogController
                ],
                middleWares: [
                    bodyParser.json(),
                    bodyParser.urlencoded({ extended: true }),
                    loggerMiddleware
                ]
            })

            app.start(() => {
                console.log(`Api listening on the http://${appConfig.url}:${appConfig.port}`);
                return resolve();
            })
        });
    }
}
