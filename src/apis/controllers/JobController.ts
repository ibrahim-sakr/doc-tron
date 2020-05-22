import {Request, Response, Router, IRouter} from 'express'
import ControllerInterface from '../interfaces/ControllerInterface';
import JobService from "../../services/JobService";
import CreateJobValidation from "../validations/CreateJobValidation";
import FindJobValidation from "../validations/FindJobValidation";
import {Job} from "../../database/models/Job";

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
        this.router.post('/', (new CreateJobValidation).validate(), this.update);
        this.router.get('/:jobId', (new FindJobValidation).validate(), this.find);
        this.router.get('/:jobId/dequeue', (new FindJobValidation).validate(), this.dequeue);
        this.router.get('/:jobId/queued', (new FindJobValidation).validate(), this.queued);
        this.router.delete('/:jobId', (new FindJobValidation).validate(), this.delete);
    }

    private async index(req: Request, res: Response) {
        // get all jobs
        const jobs = await (new JobService).all(req.query);

        return res.json(jobs);
    }

    private async find(req: Request, res: Response) {
        // validation done on a middleware
        const job = await (new JobService).getById(req['jobId']);
        return res.json(job);
    }

    private async update(req: Request, res: Response) {
        // validation done on a middleware
        const job = await (new JobService).update(req['job']);

        return res.json(job);
    }

    private async delete(req: Request, res: Response) {
        // validation done on a middleware
        return res.json(await (new JobService).deleteById(req['jobId']));
    }

    private dequeue(req: Request, res: Response) {
        // validation done on a middleware
        (new JobService).dequeue(req['jobId']);
        return res.json({status: 'ok'});
    }

    private async queued(req: Request, res: Response) {
        await (new JobService).queued(req['jobId'], req.query.status === '1');
        return res.json({status: 'ok'});
    }
}
