import {Request, Response, Router, IRouter} from 'express'
import ControllerInterface from '../interfaces/ControllerInterface';

export default class OutputController implements ControllerInterface {
    private basePath = '/output'
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
        this.router.get('/:historyId', this.find);
    }

    private index(req: Request, res: Response) {
        return res.json({});
    }

    private find(req: Request, res: Response) {
        return res.json({});
    }
}
