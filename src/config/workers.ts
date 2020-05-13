import HttpWorker from "../workers/http/HttpWorker";
import HttpValidator from "../workers/http/HttpValidator";
import SSHWorker from "../workers/ssh/SSHWorker";
import SSHValidator from "../workers/ssh/SSHValidator";

export default {
    workers: {
        http: HttpWorker,
        ssh: SSHWorker
    },
    validators: {
        http: HttpValidator,
        ssh: SSHValidator
    }
}
