import Log from "../database/models/Log";
import LogStruct from "../database/structs/LogStruct";

export default class LogService {
    all(): Promise<Log[]> {
        return Log.findAll();
    }

    create(logBody: LogStruct): Promise<Log> {
        const log = Log.build();

        log.job_id = logBody.job_id;
        log.status = logBody.status;
        log.output = logBody.output;
        log.error = logBody.error;
        log.created_at = new Date();
        log.updated_at = new Date();

        return log.save();
    }
}
