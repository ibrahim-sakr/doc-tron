import StructInterface from "../interfaces/StructInterface";

export default class LogStruct implements StructInterface {
    job_id: number;
    status: string;
    output: string | null;
    error: string | null;

    constructor(data: { job_id: number, status: string, output: string | null, error: string | null }) {
        this.job_id = data.job_id;
        this.status = data.status;
        this.output = data.output;
        this.error = data.error;
    }

    toObject(): Object {
        return {
            job_id: this.job_id,
            status: this.status,
            output: this.output,
            error: this.error
        }
    }
}
