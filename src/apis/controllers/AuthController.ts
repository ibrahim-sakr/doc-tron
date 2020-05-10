import {Request, Response, Router, IRouter} from 'express'
import ControllerInterface from '../interfaces/ControllerInterface';

export default class AuthController implements ControllerInterface {
    private basePath = '/auth'
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
        this.router.get('/token', this.token);
        this.router.get('/logout', this.logout);
    }

    private token(req: Request, res: Response) {
        return res.json({});
    }

    private logout(req: Request, res: Response) {
        return res.json({});
    }
}
