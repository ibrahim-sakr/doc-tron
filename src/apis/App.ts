import express from 'express';
import { Application } from 'express';
import ControllerInterface from "./interfaces/ControllerInterface";

export default class App {
    public app: Application
    public port: number

    constructor(init: { port: number; middleWares: Array<any>; controllers: Array<ControllerInterface>; }) {
        this.app = express();
        this.port = init.port;

        this.middlewares(init.middleWares);
        this.routes(init.controllers);
    }

    private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare);
        })
    }

    private routes(controllers: { forEach: (arg0: (controller: ControllerInterface) => void) => void; }) {
        controllers.forEach(controller => {
            this.app.use(controller.getBasePath(), controller.getRouter());
        })
    }

    public start(callback: () => void) {
        this.app.listen(this.port, callback);
    }
}
