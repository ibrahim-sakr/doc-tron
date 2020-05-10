import {Request, Response, Router, IRouter} from 'express'
import ControllerInterface from '../interfaces/ControllerInterface';

export default class UsersController implements ControllerInterface {
    private basePath = '/users'
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
        this.router.post('/', this.create);
        this.router.get('/:userId', this.find);
        this.router.put('/:userId', this.edit);
        this.router.delete('/:userId', this.delete);
    }

    private index(req: Request, res: Response) {
        return res.json({});
    }

    private create(req: Request, res: Response) {
        return res.json({});
    }

    private find(req: Request, res: Response) {
        return res.json({});
    }

    private edit(req: Request, res: Response) {
        return res.json({});
    }

    private delete(req: Request, res: Response) {
        return res.json({});
    }
}
