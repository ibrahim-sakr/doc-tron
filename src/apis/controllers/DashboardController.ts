import {Request, Response, Router, IRouter} from 'express'
import ControllerInterface from '../interfaces/ControllerInterface';
import DashboardService from "../../services/DashboardService";

export default class DashboardController implements ControllerInterface {
    private basePath = '/dashboard'
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
        this.router.get('/statistics', this.statistics);
    }

    private async statistics(req: Request, res: Response) {
        const statistics = await (new DashboardService).statistics();
        return res.json(statistics);
    }
}
