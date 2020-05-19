import {Log, LogInterface} from "../database/models/Log";

export default class LogService {
    all(): Promise<Log[]> {
        return Log.find();
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
