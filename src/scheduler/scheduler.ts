import schedulerConfig from "../config/scheduler";
import workersConfig from "../config/workers";
import WorkerInterface from "../workers/interfaces/WorkerInterface";
import JobService from '../services/JobService';
import LogService from "../services/LogService";
import {Job} from "../database/models/Job";

interface Output {
    data: string;
    started_at: Date;
}

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
        await (new JobService).setInProgress(job);

        // send to worker
        const output: Output = { data: '', started_at: new Date() };
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

    private onData(job: Job, output: Output) {
        return (chunk: Buffer) => {
            output.data += chunk.toString();
        }
    }

    private onEnd(job: Job, output: Output) {
        return async() => {
            await (new JobService()).stopInProgress(job);

            // save log entry
            await (new LogService()).create({
                job_id: job.id,
                status: 'success',
                output: output.data,
                started_at: output.started_at,
                finished_at: new Date(),
                error: null
            });
        }
    }

    private onError(job: Job, output: Output) {
        return async (error: string) => {
            await (new JobService()).stopInProgress(job);

            // save log entry
            await (new LogService()).create({
                job_id: job.id,
                status: 'failed',
                output: output.data,
                started_at: output.started_at,
                finished_at: new Date(),
                error: error
            });
        }
    }
}
