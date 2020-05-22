import {Request, Response, Router, IRouter} from 'express'
import ControllerInterface from '../interfaces/ControllerInterface';
import LogService from "../../services/LogService";
import FindLogValidation from "../validations/FindLogValidation";

export default class LogController implements ControllerInterface {
    private basePath = '/logs'
    private router: IRouter = Router()

    constructor() {
        this.init()
    }

    public getBasePath(): string {
        return this.basePath;
    }

    public getRouter(): IRouter {
        return this.router;
    }

    private init(): void {
        this.router.get('/', this.index);
        this.router.get('/:logId', (new FindLogValidation).validate(), this.find);
        this.router.get('/:jobId/', this.jobLogs);
    }

    private async index(req: Request, res: Response) {
        const logs = await (new LogService).all(req.query);
        return res.json(logs);
    }

    private async find(req: Request, res: Response) {
        // validation done on a middleware
        const log = await (new LogService).getById(req['logId']);
        return res.json(log);
    }

    private jobLogs(req: Request, res: Response) {
        return res.json({});
    }
}
