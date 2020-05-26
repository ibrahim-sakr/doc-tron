import {parseExpression} from "cron-parser";
import * as moment from "moment";
import schedulerConfig from '../config/scheduler';
import {Job, JobInterface} from "../database/models/Job";
import {Between, DeleteResult} from "typeorm";
import Scheduler from "../scheduler/scheduler";

export default class JobService {
    all(query: { in_progress?: string, search?: string }): Promise<Job[]> {
        return Job.jobsWithLastLog(query);
    }

    async update(jobBody: JobInterface): Promise<Job> {
        const job = jobBody.id ? await Job.findOne(jobBody.id) : new Job();

        job.in_progress = jobBody.in_progress;
        job.queued = jobBody.queued;
        job.name = jobBody.name;
        job.description = jobBody.description;
        job.scheduled = jobBody.scheduled;
        job.next_run = jobBody.next_run;
        job.worker = jobBody.worker;
        job.updated_at = new Date();

        return job.save();
    }

    async queued(id: number, queued: boolean) {
        // fetch job
        const job = await Job.findOne(id);
        // update it
        job.queued = queued;
        // save
        return job.save();
    }

    getReadyForDequeueList(): Promise<Job[]> {
        // select jobs where nextRun === now +- some seconds
        return Job.find({
            in_progress: false,
            queued: true,
            // next_run: Between(
            //     moment().subtract(schedulerConfig.coefficient[0] || 0, 'seconds').format('YYYY-MM-DD HH:MM:SS'),
            //     moment().subtract(schedulerConfig.coefficient[1] || 0, 'seconds').format('YYYY-MM-DD HH:MM:SS')
            // )
        });
    }

    getById(id: number): Promise<Job> {
        return Job.findOne(id);
    }

    deleteById(id: number): Promise<DeleteResult> {
        return Job.delete(id);
    }

    setInProgress(job: Job): Promise<Job> {
        job.in_progress = true;
        return job.save();
    }

    stopInProgress(job: Job): Promise<Job> {
        job.in_progress = false;
        job.next_run = parseExpression(job.scheduled).next().toDate();

        return job.save();
    }

    async dequeue(id: number) {
        // fetch job
        const job = await this.getById(id);
        (new Scheduler()).dequeue(job);
    }
}
