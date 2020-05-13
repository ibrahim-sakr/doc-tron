import schedulerConfig from "../config/scheduler";
import workersConfig from "../config/workers";
import WorkerInterface from "../workers/interfaces/WorkerInterface";
import JobService from '../services/JobService';
import LogService from "../services/LogService";
import Job from "../database/models/Job";
import LogStruct from "../database/structs/LogStruct";

export default class Scheduler {
    public run() {
        setInterval(async () => {
            const jobs = await (new JobService).getReadyForDequeueList();

            for (const job of jobs) {
                this.dequeue(job);
            }
        }, schedulerConfig.interval);
    }

    public async dequeue(job: Job): Promise<void> {
        await (new JobService).setInProgress(job);

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
            await (new JobService()).stopInProgress(job);

            // save log entry
            await (new LogService()).create(new LogStruct({
                job_id: job.id,
                status: 'success',
                output: output.data,
                error: null
            }));
        }
    }

    private onError(job: Job, output: { data: string }) {
        return async (error: string) => {
            await (new JobService()).stopInProgress(job);

            // save log entry
            await (new LogService()).create(new LogStruct({
                job_id: job.id,
                status: 'failed',
                output: output.data,
                error: error
            }));
        }
    }
}
