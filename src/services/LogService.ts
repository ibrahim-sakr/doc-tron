import {Log, LogInterface} from "../database/models/Log";
import {In} from "typeorm";

export default class LogService {
    all(query: { status?: string, jobs?: string[] }): Promise<Log[]> {
        const options = {
            where: {},
            relations: ["job"]
        };

        if (query.status) {
            options.where['status'] = query.status;
        }

        if (query.jobs) {
            if(!Array.isArray(query.jobs)) {
                query.jobs = [query.jobs];
            }

            options.where['job_id'] = In(query.jobs);
        }

        return Log.find(options);
    }

    getById(id: number): Promise<Log> {
        return Log.findOne({
            where: {
                id: id
            },
            relations: ["job"]
        });
    }

    create(logBody: LogInterface): Promise<Log> {
        const log = new Log();

        log.job_id = logBody.job_id;
        log.status = logBody.status;
        log.output = logBody.output;
        log.error = logBody.error;

        return log.save();
    }
}
