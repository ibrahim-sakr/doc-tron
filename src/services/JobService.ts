import {parseExpression} from "cron-parser";
import Job from '../database/models/Job';
import JobStruct from "../database/structs/JobStruct";
import {Op} from "sequelize";
import * as moment from "moment";
import schedulerConfig from '../config/scheduler';

export default class JobService {
    all(): Promise<Job[]> {
        return Job.findAll();
    }

    create(jobBody: JobStruct): Promise<Job> {
        const job = Job.build();
        job.in_progress = jobBody.inProgress;
        job.queued = jobBody.queued;
        job.name = jobBody.name;
        job.description = jobBody.description;
        job.scheduled = jobBody.scheduled;
        job.next_run = jobBody.nextRun;
        job.args = jobBody.args;
        job.worker = jobBody.worker;
        job.created_at = new Date();
        job.updated_at = new Date();

        return job.save();
    }

    async getReadyForDequeueList(): Promise<Job[]> {
        // select jobs where nextRun === now +- some seconds
        return Job.findAll({
            where: {
                in_progress: false,
                queued: true,
                // next_run: {
                //     [Op.gte]: moment().subtract(schedulerConfig.coefficient[0] || 0, 'seconds').toDate(),
                //     [Op.lt]: moment().add(schedulerConfig.coefficient[1] || 0, 'seconds').toDate()
                // }
            }
        })
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
