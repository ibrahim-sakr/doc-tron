import {parseExpression} from "cron-parser";
import * as moment from "moment";
import schedulerConfig from '../config/scheduler';
import {Job, JobInterface} from "../database/models/Job";
import {Between, Brackets, DeleteResult, LessThanOrEqual, Like, MoreThanOrEqual} from "typeorm";
import {WhereExpression} from "typeorm/query-builder/WhereExpression";

export default class JobService {
    all(query: { status?: string, search?: string }): Promise<Job[]> {
        return Job.find({
            name: Like(query.search ? '%' + query.search + '%' : '%%')
        });
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

    getReadyForDequeueList(): Promise<Job[]> {
        // select jobs where nextRun === now +- some seconds
        return Job.find({
            in_progress: false,
            queued: true,
            next_run: Between(
                moment().subtract(schedulerConfig.coefficient[0] || 0, 'seconds').format('YYYY-MM-DD HH:MM:SS'),
                moment().subtract(schedulerConfig.coefficient[1] || 0, 'seconds').format('YYYY-MM-DD HH:MM:SS')
            )
        });
    }

    getById(id: string): Promise<Job> {
        return Job.findOne(id);
    }

    deleteById(id: string): Promise<DeleteResult> {
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
}
