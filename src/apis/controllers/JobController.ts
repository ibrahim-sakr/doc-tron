import {Request, Response, Router, IRouter} from 'express'
import ControllerInterface from '../interfaces/ControllerInterface';
import JobService from "../../services/JobService";
import CreateJobValidation from "../validations/CreateJobValidation";

export default class JobController implements ControllerInterface {
    private basePath = '/jobs'
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
        this.router.post('/', (new CreateJobValidation).validate(), this.create);
        this.router.get('/:jobId', this.find);
        this.router.put('/:jobId', this.update);
        this.router.delete('/:jobId', this.delete);
    }

    private async index(req: Request, res: Response) {
        // get all jobs
        const jobs = await (new JobService).all();

        return res.json(jobs);
    }

    private async create(req: Request, res: Response) {
        // validation done on a middleware
        // create job
        const job = await (new JobService).create(req['job']);

        return res.json(job).end();
    }

    private find(req: Request, res: Response) {
        return res.json({});
    }

    private update(req: Request, res: Response) {
        return res.json({});
    }

    private delete(req: Request, res: Response) {
        return res.json({});
    }
}
