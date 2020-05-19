import schedulerConfig from "../config/scheduler";
import workersConfig from "../config/workers";
import WorkerInterface from "../workers/interfaces/WorkerInterface";
import JobService from '../services/JobService';
import LogService from "../services/LogService";
import {Job} from "../database/models/Job";

export default class Scheduler {
    public run() {
        setInterval(async () => {
            console.log('selecting all jobs');
            const jobs: Job[] = await (new JobService).getReadyForDequeueList();
            console.log('jobs', jobs);

            for (const job of jobs) {
                this.dequeue(job);
            }
        }, schedulerConfig.interval);
    }

    public async dequeue(job: Job): Promise<void> {
        console.log('Start Dequeue');
        await (new JobService).setInProgress(job);
        console.log('set in progress done');

        // send to worker
        const output = { data: '' };
        const worker = this.getWorker(job.worker['type']);
        worker.on('data', this.onData(job, output));
        worker.on('end', this.onEnd(job, output));
        worker.on('error', this.onError(job, output));

        worker.send(job);
    }

    private getWorker(type: string): WorkerInterface {
        if(type in workersConfig.workers) {
            return new workersConfig.workers[type]();
        }
    }

    private onData(job: Job, output: { data: string }) {
        return (chunk: Buffer) => {
            output.data += chunk.toString();
        }
    }

    private onEnd(job: Job, output: { data: string }) {
        return async() => {
            console.log('stopping in progress');
            await (new JobService()).stopInProgress(job);
            console.log('stop in progress done');

            // save log entry
            await (new LogService()).create({
                job_id: job.id,
                status: 'success',
                output: output.data,
                error: null
            });
            console.log('Log Created');
        }
    }

    private onError(job: Job, output: { data: string }) {
        return async (error: string) => {
            console.log('stopping in progress');
            await (new JobService()).stopInProgress(job);
            console.log('stop in progress done');

            // save log entry
            await (new LogService()).create({
                job_id: job.id,
                status: 'failed',
                output: output.data,
                error: error
            });
            console.log('Log Created');
        }
    }
}
