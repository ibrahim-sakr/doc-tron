import {Request, Response, Router, IRouter} from 'express'
import ControllerInterface from '../interfaces/ControllerInterface';
import JobService from "../../services/JobService";
import CreateJobValidation from "../validations/CreateJobValidation";
import FindJobValidation from "../validations/FindJobValidation";

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
        this.router.get('/:jobId', (new FindJobValidation).validate(), this.find);
        this.router.put('/:jobId', (new CreateJobValidation).validate(), this.update);
        this.router.delete('/:jobId', (new FindJobValidation).validate(), this.delete);
    }

    private async index(req: Request, res: Response) {
        // get all jobs
        const jobs = await (new JobService).all(req.query);

        return res.json(jobs);
    }

    private async create(req: Request, res: Response) {
        // validation done on a middleware
        // create job
        const job = await (new JobService).create(req['job']);

        return res.json(job).end();
    }

    private async find(req: Request, res: Response) {
        // validation done on a middleware
        const job = await (new JobService).getById(req['jobId']);
        return res.json(job);
    }

    private async update(req: Request, res: Response) {
        // validation done on a middleware
        const job = await (new JobService).update(req.params.jobId, req['job']);

        return res.json(job);
    }

    private async delete(req: Request, res: Response) {
        // validation done on a middleware
        return res.json(await (new JobService).deleteById(req['jobId']));
    }
}
